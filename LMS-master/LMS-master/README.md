# Aura LMS v2.0 - Artificial Intelligence Enhanced Learning

Welcome to the new **Aura LMS**, a modern learning management system built with Next.js and Express, augmented by a state-of-the-art **Neural Cognitive Suite**.

## 🚀 Key Features
*   **🧠 Neural Tutor Chat**: Real-time 1-on-1 assistance using Llama-3 models via Hugging Face Router.
*   **📱 Seamless Video Experience**: Full-screen course player with automatic skip-functions for restricted content.
*   **💎 Visual Refresh**: Curated premium thumbnails and a sleek gold-neon aesthetic.
*   **📈 Dashboard Analytics**: Track progress and performance in a cinematic glassmorphism layout.

## 📦 Tech Stack
*   **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons, Framer Motion.
*   **Backend**: Node.js, Express, Knex (ORM), MySQL (Aiven).
*   **AI Engine**: Hugging Face Inference Providers (Llama-3, Qwen-2.5).

## 🛠️ Installation & Setup

### 1. Clone & Install
```bash
git clone https://github.com/Prajwal0697/Ignite_LMS.git
cd Ignite_LMS/LMS-master/LMS-master
```

### 2. Configure Environment
Create a `.env` in both `lms-frontend` and `lms-backend` with your keys:
*   `DB_HOST`, `DB_USER`, `DB_PASSWORD` (MySQL)
*   `HUGGINGFACE_API_KEY` (Your Write access token)
*   `JWT_ACCESS_SECRET`

### 3. Run Development
```bash
# Start Backend (Port 5000)
cd lms-backend && npm run dev

# Start Frontend (Port 3000)
cd ../lms-frontend && npm run dev
```

---

## 🌎 Deployment
Currently production-ready for deployment to **Vercel** (Frontend) and **Render** (Backend). Remember to set your environment variables in your deployment dashboard.

---

*Built with ❤️ for the future of education.*
