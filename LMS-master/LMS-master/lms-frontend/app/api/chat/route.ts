import { NextResponse } from 'next/server';

/**
 * Aura AI Tutor - Chat API Route
 * This route handles the AI tutor chatbot interactions.
 */

const SYSTEM_PROMPT = `You are a helpful AI tutor for AuraLMS specializing in programming, web development, and AI/ML topics including Hugging Face, LLMs, SLMs, NLP, Deep Learning, and Machine Learning. When the student is watching an AI/ML topic, give practical examples and relate concepts to real tools like Hugging Face, ChatGPT, and Gemini.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // NOTE: This is a placeholder for the actual AI integration.
    // In a production environment, you would integrate an AI provider here 
    // (e.g., OpenAI, Google Gemini, or Anthropic) and pass the SYSTEM_PROMPT.
    
    return NextResponse.json({ 
      success: true,
      hint: "System prompt updated with AI/ML context.",
      role: "assistant",
      content: "Hello! I am your Aura AI Tutor. I've been updated with new knowledge about AI, ML, and tools like Hugging Face and LLMs. How can I help you today?"
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
