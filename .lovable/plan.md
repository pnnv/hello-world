

# VidyaMind — Improvement Plan

## Important Platform Constraint

**This project is built with Next.js**, which Lovable does not natively support. The project may have limited build/preview functionality. The changes below work within this constraint, but some features (like API routes) may not function in Lovable's preview environment.

---

## 1. Groq vs Grok — Model Clarification

Your project uses **Groq** (the inference platform at groq.com), not **Grok** (xAI's chatbot). These are completely different:

| | **Groq** (your project) | **Grok** (xAI) |
|---|---|---|
| Company | Groq Inc. | xAI (Elon Musk) |
| What it is | LLM inference API (runs Llama, Mixtral, etc.) | A chatbot model |
| API access | groq.com — free tier available | api.x.ai — separate API |
| Your code uses | `groq-sdk` npm package, model `llama-3.3-70b-versatile` | Not used |

**Can you continue using Groq?** Yes, completely legal. You're calling open-source models (Llama 3.3) via Groq's inference API. You need:
- A Groq API key from [console.groq.com](https://console.groq.com)
- Set `GROQ_API_KEY` as an environment variable
- Free tier has rate limits; paid plans available for production

No licensing issues — Llama 3.3 is open-source under Meta's license.

---

## 2. README.md

Create a comprehensive README covering:
- Project overview (AI-powered learning platform for Indian students)
- Features list (Knowledge Graph, BKT mastery tracking, Socratic tutor, rubric grading, spaced repetition, multilingual support)
- Tech stack (Next.js, React, TypeScript, Tailwind CSS, Zustand, Groq API, Framer Motion, Recharts, KaTeX)
- Backend section (Python FastAPI backend in `/backend`)
- Installation steps for both frontend and backend
- Environment variable setup (GROQ_API_KEY)
- Folder structure explanation
- Future improvements section

---

## 3. Codebase Refactoring

Key improvements to make:

**a. Fix encoding issues** — The landing page has corrupted characters (`â€"`, `Â·`). Replace with proper Unicode.

**b. Extract inline styles to CSS** — Many components use verbose inline `style={{ color: "var(--vm-text-muted)" }}` repeatedly. Create utility classes like `.text-vm-muted`, `.bg-vm-card`, etc. in globals.css to reduce repetition.

**c. Component extraction** — Dashboard page is 280+ lines. Extract:
- `StatCard` component
- `ConceptList` component  
- `SyllabusUploader` component
- `QuickActions` component

**d. Type safety** — Add proper TypeScript interfaces for API responses instead of inline type annotations.

**e. Error handling** — API calls use bare `catch` blocks with no user feedback beyond store errors. Add toast/notification support.

---

## 4. UI Redesign — Material UI with Soft Pastel Palette

This is the largest change. The approach:

**a. Install MUI dependencies**
- `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`

**b. Create a custom MUI theme** with soft pastel palette:
- Primary: `#7C8CF5` (soft lavender)
- Secondary: `#F5A8C8` (soft pink)  
- Background: `#FAFBFE` (near-white with blue tint)
- Surface/Card: `#FFFFFF` with subtle border
- Text primary: `#2D3142`
- Text secondary: `#6B7194`
- Success: `#7DD3A8`, Warning: `#F5D98C`, Error: `#F5918C`
- All flat, no gradients, no shadows heavier than `elevation={1}`

**c. Convert components page by page:**
1. **Layout** — MUI `ThemeProvider`, `CssBaseline`, swap sidebar to MUI `Drawer`
2. **Landing page** — MUI `Container`, `Typography`, `Button`, `Card`, `Grid`
3. **Dashboard** — MUI `Card`, `LinearProgress`, `Chip`, `List`
4. **Sidebar** — MUI `Drawer` with `List`/`ListItemButton`
5. **Learn page** — MUI `TextField`, `Paper`, `IconButton` for chat interface
6. **Evaluate page** — MUI `TextField`, `Rating`, `Accordion`
7. **Planner page** — MUI `Table` or `DataGrid`, `Chip`

**d. Remove Tailwind dependency** after full conversion (or keep for utility spacing if preferred).

**e. Switch from dark to light mode** — The pastel palette implies a light theme. Remove the dark-mode CSS variables and `class="dark"` from HTML.

---

## Implementation Order

1. README.md creation
2. Fix encoding bugs and extract reusable components
3. Install MUI and create theme
4. Convert layout + sidebar to MUI
5. Convert landing page
6. Convert dashboard and remaining pages
7. Clean up old CSS variables and unused Tailwind styles

**Estimated scope**: This is a significant refactor touching every page. Each page conversion involves replacing all styled elements with MUI components and applying the new pastel theme.

