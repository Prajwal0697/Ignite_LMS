# Ignite LMS

Full-stack learning management system: **Next.js** frontend, **Express** + **MySQL** backend, optional **Hugging Face**–powered AI tutor, and a small **Gradio** app for Hugging Face Spaces.

## Clone

```bash
git clone https://github.com/Prajwal0697/Ignite_LMS.git
cd Ignite_LMS
```

## Repository layout

| Path | Description |
|------|-------------|
| `LMS-master/LMS-master/lms-frontend` | Next.js 14 app |
| `LMS-master/LMS-master/lms-backend` | Express API (Knex, JWT, migrations) |
| `huggingface-space-chatbot` | Optional Gradio Space (`app.py`, `requirements.txt`) |

## Quick start (local)

1. **Backend** — from `LMS-master/LMS-master/lms-backend`, copy env template, set `DB_*`, `JWT_*`, and optional `HF_API_KEY`, then:

   ```bash
   npm install
   npm run dev
   ```

2. **Frontend** — from `LMS-master/LMS-master/lms-frontend`:

   ```bash
   npm install
   npm run dev
   ```

   Point `NEXT_PUBLIC_API_BASE_URL` (or `NEXT_PUBLIC_API_URL`) at your API (e.g. `http://localhost:5000`).

## License

Use and modify according to your needs.
