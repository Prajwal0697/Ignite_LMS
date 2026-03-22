import axios from 'axios';
// @ts-ignore
const console = global.console;
import { env } from '../../config/env';

// The new Hugging Face Router API (OpenAI-compatible)
const HF_ROUTER_BASE = 'https://router.huggingface.co/v1';

const hfClient = axios.create({
  baseURL: HF_ROUTER_BASE,
  timeout: 90000,
  headers: {
    Authorization: `Bearer ${env.huggingface.apiKey}`,
    'Content-Type': 'application/json',
  },
});

// Models must be enabled for your HF account under Inference Providers (router rejects others with 400).
const CHAT_MODELS = [
  'Qwen/Qwen2.5-7B-Instruct',
  'meta-llama/Llama-3.1-8B-Instruct',
];

export const chatWithAI = async (message: string, context: string = '') => {
  console.log('🤖 AI Sync: Calling HF Router API. Key length:', env.huggingface.apiKey?.length || 0);
  
  // If no API key, return a helpful demo response
  if (!env.huggingface.apiKey || env.huggingface.apiKey.trim() === '') {
    console.log('[AI Service] No API key configured, using demo mode');
    return `**Demo Mode** - To enable full AI tutoring, please add a Hugging Face API key in the .env file.\n\nYou asked: "${message}"\n\nI'm an AI tutor ready to help you learn programming concepts, debug code, explain algorithms, and answer questions about your courses. Get a free API key at https://huggingface.co/settings/tokens`;
  }
  
  const systemPrompt = `You are a helpful AI tutor for the Ignite LMS online learning platform.
Keep your answers clear, concise, and educational.
Context about the current material: ${context}`;

  let lastError = '';

  for (const model of CHAT_MODELS) {
    try {
      console.log(`[AI Service] Attempting model: ${model}`);
      const response = await hfClient.post('/chat/completions', {
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      });
      
      const result = response.data.choices[0]?.message?.content || "";
      if (result) {
        console.log(`[AI Service] Success with ${model}`);
        return result.trim();
      }
    } catch (error: any) {
      const errorDetail = error.response?.data?.error || error.response?.data || error.message;
      lastError =
        typeof errorDetail === 'object'
          ? errorDetail?.message || JSON.stringify(errorDetail)
          : String(errorDetail);
      console.warn(`[AI Service] ⚠️ Model ${model} failed:`, lastError);
    }
  }

  return (
    '**AI temporarily unavailable.** Hugging Face could not run a model with your account settings.\n\n' +
    'Open [Inference Providers](https://huggingface.co/settings/inference-providers) and enable at least one provider, ' +
    'or create a fine-grained token with **Make calls to Inference Providers**.\n\n' +
    (lastError ? `Details: ${lastError.slice(0, 400)}` : '')
  );
};

export const summarizeContent = async (text: string) => {
  for (const model of CHAT_MODELS) {
    try {
      const response = await hfClient.post('/chat/completions', {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a professional summarizer. Provide a concise, bulleted summary of the following text.',
          },
          { role: 'user', content: text.slice(0, 3000) },
        ],
        max_tokens: 300,
      });
      const out = response.data.choices[0]?.message?.content;
      if (out) return out;
    } catch (error: any) {
      console.error(`HF Summarize Error (${model}):`, error.response?.data || error.message);
    }
  }
  throw new Error('AI Summarization unavailable');
};

export const generateQuiz = async (text: string) => {
  try {
    const prompt = `Based on the following text, generate 3 multiple choice questions.
Return ONLY valid JSON in this format: 
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "correctAnswer": "..."
  }
]

Text: ${text.slice(0, 2000)}`;

    let resultText = '[]';
    for (const model of CHAT_MODELS) {
      try {
        const response = await hfClient.post('/chat/completions', {
          model,
          messages: [
            { role: 'system', content: 'You are a quiz generator. You only output valid JSON.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 600,
        });
        resultText = response.data.choices[0]?.message?.content || '[]';
        break;
      } catch (e: any) {
        console.warn(`[Quiz] model ${model} failed`, e.response?.data || e.message);
      }
    }
    try {
      // Find the first [ and last ] to extract JSON if there's fluff
      const start = resultText.indexOf('[');
      const end = resultText.lastIndexOf(']') + 1;
      return JSON.parse(resultText.slice(start, end));
    } catch {
      return JSON.parse(resultText); // Fallback
    }
  } catch (error: any) {
    console.error('HF Quiz Gen Error:', error.response?.data || error.message);
    return [{
       question: "What is the key concept in this chapter?",
       options: ["Primary topic", "Ancillary data", "Related matter", "None"],
       correctAnswer: "Primary topic"
    }];
  }
};

export const recommendCourses = async (enrolledIds: number[], allCourses: any[]) => {
  // Logic remains the same as it doesn't use the API
  const enrolledCourses = allCourses.filter(c => enrolledIds.includes(c.id));
  const enrolledCategories = new Set(enrolledCourses.map(c => c.category));
  
  const recommendations = allCourses
    .filter(c => !enrolledIds.includes(c.id) && enrolledCategories.has(c.category))
    .slice(0, 3);
    
  if (recommendations.length < 3) {
    const extra = allCourses
      .filter(c => !enrolledIds.includes(c.id) && !recommendations.find((r: any) => r.id === c.id))
      .slice(0, 3 - recommendations.length);
    return [...recommendations, ...extra];
  }
  return recommendations;
};
