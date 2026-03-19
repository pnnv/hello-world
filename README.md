# ScoreCraft — AI Learning Platform

> AI-powered personalized learning platform with intelligent tutoring, progress tracking, rubric-aware grading, and adaptive study planning — designed to help you master any subject.

![ScoreCraft](https://img.shields.io/badge/ScoreCraft-AI%20Learning%20Platform-7C8CF5?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-orange?style=flat-square)

---

## 📖 Overview

ScoreCraft is an AI-powered learning platform designed to help students prepare for competitive exams (JEE, NEET, CLAT) and master any academic subject. It combines knowledge graph-based tutoring, intelligent progress tracking, rubric-aware grading, and adaptive study planning into a unified learning experience.

The platform uses **Groq's inference API** to run open-source LLMs (Llama 3.3 70B) for real-time AI tutoring, evaluation, and personalized learning recommendations.

---

## ✨ Features

### 🧠 Knowledge Graph Tutoring
- Auto-generates concept maps from official exam syllabi
- AI diagnoses learning gaps using prerequisite chains
- Socratic step-by-step coaching with culturally adapted analogies

### 📊 Bayesian Mastery Tracking (BKT)
- Real-time mastery estimation using Bayesian Knowledge Tracing
- Per-concept mastery scores with visual progress indicators
- Exam readiness score derived from aggregate mastery

### 📝 Rubric-Aware Grading
- Submit essays, code, or lab reports for AI evaluation
- Criterion-by-criterion feedback with actionable suggestions
- Academic integrity analysis (originality scoring, AI-risk detection)

### 📅 Smart Spaced Repetition
- SM-2+ algorithm with exam-date-aware scheduling
- Generates day-by-day study plans up to 6 months
- Tracks completed, missed, and revision sessions

### 🗺️ Visual Roadmap
- Zoomable, pannable subject-level roadmap view
- Color-coded heatmap showing mastery across all topics
- Subject cards with expandable chapter lists

### 🌐 Multilingual Support
- Voice input in Hindi, Tamil, Telugu, Marathi, and English
- Culturally adapted explanations for Indian students

### 🔒 Academic Integrity
- Originality scoring and citation suggestions
- Writing style consistency analysis
- AI-generated content risk assessment

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Material UI (MUI)** | Component library with soft pastel theme |
| **Framer Motion** | Animations and transitions |
| **Zustand** | Lightweight state management with persistence |
| **Recharts** | Data visualization (charts) |
| **React Force Graph 2D** | Knowledge graph visualization |
| **KaTeX** | Math equation rendering |
| **React Markdown** | Markdown rendering with math support |

### Backend (Python)
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API server |
| **Groq SDK** | LLM inference (Llama 3.3 70B) |
| **Python 3.11+** | Backend runtime |

### AI / ML
| Component | Algorithm |
|---|---|
| **Mastery Tracking** | Bayesian Knowledge Tracing (BKT) |
| **Spaced Repetition** | SM-2+ algorithm |
| **LLM Inference** | Groq API → Llama 3.3 70B Versatile |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/bun
- **Python** 3.11+ (for backend)
- **Groq API Key** from [console.groq.com](https://console.groq.com)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vidyamind.git
cd vidyamind
```

### 2. Install Frontend Dependencies
```bash
npm install
# or
bun install
```

### 3. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 4. Set Environment Variables
Create a `.env.local` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 5. Run the Development Servers

**Frontend** (in one terminal):
```bash
npm run dev
```

**Backend** (in another terminal):
```bash
cd backend
uvicorn main:app --reload --port 8000
```

The frontend runs on `http://localhost:3000` and proxies API requests to the Python backend on port 8000 (configured in `next.config.ts`).

---

## 📁 Project Structure

```
vidyamind/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Landing page
│   │   ├── layout.tsx              # Root layout with MUI ThemeProvider
│   │   ├── globals.css             # Global styles and design tokens
│   │   ├── auth/
│   │   │   └── page.tsx            # Login & registration with exam selection
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   │   ├── page.tsx            # Main dashboard with stats & KG overview
│   │   │   ├── knowledge-graph/
│   │   │   │   └── page.tsx        # Syllabus tracker with subject tabs
│   │   │   ├── roadmap/
│   │   │   │   └── page.tsx        # Zoomable exam roadmap visualization
│   │   │   ├── learn/
│   │   │   │   └── page.tsx        # AI tutor chat + concept sidebar + quiz
│   │   │   ├── evaluate/
│   │   │   │   └── page.tsx        # Rubric-aware grading + integrity check
│   │   │   └── planner/
│   │   │       └── page.tsx        # Spaced repetition study planner
│   │   └── api/ai/                 # Next.js API routes (proxy to backend)
│   ├── components/
│   │   └── dashboard/
│   │       └── Sidebar.tsx         # Navigation sidebar
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── groq.ts             # Groq SDK client wrapper
│   │   │   └── prompts.ts          # System prompt templates
│   │   ├── data/
│   │   │   └── exam-syllabi.ts     # Hardcoded exam data (JEE, NEET, etc.)
│   │   ├── knowledge-graph/
│   │   │   ├── types.ts            # TypeScript interfaces
│   │   │   ├── builder.ts          # KG construction logic
│   │   │   └── traversal.ts        # Graph traversal algorithms
│   │   ├── mastery/
│   │   │   ├── bkt.ts              # Bayesian Knowledge Tracing
│   │   │   └── spaced-repetition.ts # SM-2+ scheduling
│   │   └── planner/
│   │       └── plan-generator.ts   # Study plan generation algorithm
│   └── store/
│       ├── stores.ts               # Zustand stores (KG, Mastery, Chat, Eval, Plan)
│       └── auth-store.ts           # Authentication store
├── backend/                        # Python FastAPI backend
│   ├── main.py                     # FastAPI app entry point
│   ├── routers/                    # API route handlers
│   ├── services/
│   │   └── groq_client.py          # Groq API client (Python)
│   ├── algorithms/                 # BKT, KG builder, spaced repetition
│   ├── prompts/
│   │   └── templates.py            # LLM prompt templates
│   └── requirements.txt
├── next.config.ts                  # Next.js config with API proxy
├── package.json
└── tsconfig.json
```

---

## 🔑 API & Model Usage

### Groq (Not Grok)

This project uses **Groq** (groq.com) — an LLM inference platform — not **Grok** (xAI's chatbot). They are completely different products.

| | Groq (used here) | Grok (xAI) |
|---|---|---|
| Company | Groq Inc. | xAI (Elon Musk) |
| What it is | LLM inference API | A chatbot model |
| Models | Runs Llama, Mixtral, etc. | Proprietary model |
| API | groq.com | api.x.ai |

### Can I continue using Groq?

**Yes, absolutely.** Groq provides an inference API for open-source models. You're running **Meta's Llama 3.3 70B** which is released under the Llama Community License — free for commercial use.

**Setup:**
1. Sign up at [console.groq.com](https://console.groq.com)
2. Generate an API key
3. Set `GROQ_API_KEY` in your environment
4. Free tier includes rate limits; paid plans available for production

---

## 🎨 Design System

ScoreCraft uses a **modern minimalist Material UI theme** with:
- **Primary Accent:** Lavender (`#7C8CF5`)
- **Background:** Clean white (`#FFFFFF` / `#FAFBFC`)
- **Text:** Dark slate for contrast (`#1A1D2E`)
- **Flat design** — no gradients, solid colors with subtle shadows
- **Clean typography** with Inter font family and optimized spacing

---

## 🔮 Future Improvements

- [ ] Real authentication with OAuth (Google, GitHub)
- [ ] PostgreSQL database for persistent user data
- [ ] Collaborative study groups
- [ ] Progress analytics dashboard with detailed charts
- [ ] PDF syllabus parsing with OCR support
- [ ] Mobile-responsive PWA
- [ ] Offline mode with service workers
- [ ] Integration with Google Calendar for study reminders
- [ ] Voice output (text-to-speech) for explanations
- [ ] Gamification (badges, leaderboards, XP system)

---

## 📄 License

This project is for educational purposes. The AI models (Llama 3.3) are used under Meta's Llama Community License.

---

<p align="center">
  <strong>ScoreCraft</strong> — Your Intelligent Learning Platform<br/>
  <em>AI-powered education for every learner</em>
</p>
