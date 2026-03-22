"""
Hugging Face Space — chatbot using the Inference Router (OpenAI-compatible).

1. Space Settings → Repository secrets → add HF_TOKEN = your Hugging Face read token.
2. Commit app.py + requirements.txt and push to the Space repo.
"""

import os

import gradio as gr
import requests

ROUTER = "https://router.huggingface.co/v1/chat/completions"

# Must match models enabled for your HF account (Inference Providers).
MODELS = [
    "Qwen/Qwen2.5-7B-Instruct",
    "meta-llama/Llama-3.1-8B-Instruct",
]


def _token() -> str:
    return (
        os.environ.get("HF_TOKEN", "")
        or os.environ.get("HUGGING_FACE_HUB_TOKEN", "")
    ).strip()


def chat(message: str, history: list[list[str]]) -> str:
    token = _token()
    if not token:
        return (
            "**No token configured.**\n\n"
            "Open this Space → **Settings** → **Repository secrets** → "
            "add secret name **`HF_TOKEN`** with your Hugging Face token "
            "(read access is enough)."
        )

    messages: list[dict] = [
        {
            "role": "system",
            "content": "You are a helpful, clear, and concise assistant.",
        }
    ]
    for user_msg, assistant_msg in history:
        messages.append({"role": "user", "content": user_msg})
        if assistant_msg:
            messages.append({"role": "assistant", "content": assistant_msg})
    messages.append({"role": "user", "content": message})

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    last_err: str | None = None

    for model in MODELS:
        try:
            r = requests.post(
                ROUTER,
                headers=headers,
                json={
                    "model": model,
                    "messages": messages,
                    "max_tokens": 512,
                    "temperature": 0.7,
                },
                timeout=90,
            )
            if r.ok:
                data = r.json()
                choices = data.get("choices") or []
                text = (choices[0].get("message") or {}).get("content") or ""
                if text.strip():
                    return text.strip()
            last_err = r.text[:800]
        except Exception as exc:  # noqa: BLE001
            last_err = str(exc)

    return f"Could not get a reply from any model. Last detail:\n```\n{last_err}\n```"


demo = gr.ChatInterface(
    fn=chat,
    title="Chatbot",
    description="Uses the Hugging Face Inference Router. Set the **`HF_TOKEN`** secret on this Space.",
    examples=["Explain recursion in one paragraph.", "What is a REST API?"],
)

if __name__ == "__main__":
    demo.launch()
