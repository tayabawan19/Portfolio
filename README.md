<div align="center">

# ⚡ Muhammad Tayyab Tanveer | Personal Portfolio & AI Engineering Showcase

**A state-of-the-art, 3D interactive, full-stack developer portfolio and AI engineering learning tracker.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.0_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-06B6D4?style=for-the-badge)](LICENSE)

[Live Demo](https://tayab.me) • [Report Bug](https://github.com/tayabawan19/Portfolio/issues) • [Request Feature](https://github.com/tayabawan19/Portfolio/issues)

</div>

---

## 📖 Overview

This repository contains the source code for the personal portfolio of **Muhammad Tayyab Tanveer**, a Software Engineering student at **COMSATS University Islamabad** and an aspiring AI Systems Engineer.

Engineered with performance, aesthetics, and modern web standards in mind, this project goes beyond a static curriculum vitae. It features real-time 3D canvas rendering using **Three.js** and **React Three Fiber**, buttery-smooth scroll experiences powered by **Lenis** and **GSAP ScrollTrigger**, an interactive **AI Chatbot Assistant** powered by **Google Gemini 2.0 Flash**, and a full-stack **Express & MongoDB** backend for handling client interactions.

---

## ✨ Key Features

- **🌐 Interactive 3D Visuals & Canvas**:
  - **3D Hero Scene**: Custom dynamic lighting, orbiting geometry, and camera controls using `@react-three/fiber` and `@react-three/drei`.
  - **Interactive 3D Skills Sphere**: An interactive, rotating 3D tag cloud displaying technical proficiencies.
  - **Background Particle Field**: Subtle, responsive floating particle simulation reacting to canvas space.

- **🤖 Integrated Gemini AI Assistant**:
  - Embedded conversational widget powered by the `@google/generative-ai` SDK (`gemini-2.0-flash`).
  - Tuned with a custom system prompt and a localized fallback knowledge base for questions about education, skills, projects, and contact info.
  - Persistent conversation state saved in `localStorage` with typing animations and session resets.

- **⚡ Buttery Smooth Animations & UX**:
  - **Lenis Inertial Scrolling**: Premium, lag-free smooth scrolling across all devices.
  - **GSAP & ScrollTrigger**: Staggered text reveals, timeline progress lines, and scroll-linked animations.
  - **Framer Motion**: Micro-interactions, spring animations, and smooth layout transitions.

- **📊 AI Engineering Build Log Tracker**:
  - Dedicated interactive learning dashboard tracking milestones across Python foundations, LLM API integrations (Groq + Llama 3.3), Prompt Engineering, RAG, and AI agents.
  - Filterable by status (completed, in-progress, planned) with direct links to daily source code artifacts.

- **📁 Project Showcase & Interactive Cards**:
  - Categorized software projects (C++, Java, Python, Web & Documentation).
  - 3D perspective tilt hover effects, feature lists, tech stack tags, and modal dialogs with detailed architecture write-ups and GitHub repository links.

- **📬 Full-Stack Contact Pipeline**:
  - Connected to an Express 5 REST API.
  - Validated and stored in **MongoDB Atlas** using **Mongoose**.
  - Dual-mode deployment architecture: runs seamlessly as a standalone Express server or as a serverless function on Vercel.

---

## 🛠️ Tech Stack & Architecture

### Frontend
| Technology | Role |
| :--- | :--- |
| **React 19** | Core UI component library and reactive state management |
| **Vite 8** | Next-generation blazing fast build tool and dev server |
| **Tailwind CSS v4** | Modern utility-first styling with custom cyber/dark themes |
| **Three.js & React Three Fiber** | 3D rendering pipeline, meshes, materials, and lighting |
| **Framer Motion** | Declarative gestures, entrance animations, and modals |
| **GSAP & ScrollTrigger** | Advanced timeline animations and scroll-driven interactions |
| **Lenis** | Smooth inertial scrolling engine |
| **Swiper 14** | Touch-enabled responsive carousels for services and testimonials |
| **Lucide React** | Clean, modern feather-style iconography |

### Backend & AI
| Technology | Role |
| :--- | :--- |
| **Node.js & Express 5** | REST API server for messaging and static asset serving |
| **MongoDB & Mongoose 9** | NoSQL database for structured storage of contact inquiries |
| **Google Generative AI** | Gemini 2.0 Flash SDK integration for the virtual assistant |
| **Dotenv & CORS** | Environment variable management and cross-origin security |

---

## 📂 Project Structure

```plaintext
Portfolio/
├── .env.example              # Template for environment variables
├── .gitignore                # Git ignore rules
├── api/                      # Serverless API endpoints for Vercel
│   └── index.js              # Serverless bridge to Express app
├── index.html                # Main HTML entry with Google Fonts & Analytics
├── package.json              # Project dependencies and run scripts
├── public/                   # Static assets (PDFs, media, avatar intro video)
│   ├── avatar-intro.mp4      # Interactive developer intro video
│   ├── certificate_arch.pdf  # Technical certifications
│   ├── certificate_excelerate.pdf # Excelerate / RIT AI Internship certificate
│   ├── resume.pdf            # Latest resume download
│   └── favicon.svg           # Custom website favicon
├── server.js                 # Express server & MongoDB Mongoose connection
├── src/                      # Client-side React source code
│   ├── App.css               # Global application styles
│   ├── App.jsx               # Main page layout & section assembly
│   ├── index.css             # Tailwind imports & theme tokens
│   ├── main.jsx              # React DOM root mounting
│   ├── assets/               # Local icons and images
│   └── components/           # Modular, reusable React components
│       ├── AvatarVideo.jsx        # Video player with controls & modal
│       ├── BackgroundParticles.jsx # Canvas particle simulation
│       ├── BuildLog.jsx           # AI Engineering learning progression
│       ├── ChatbotWidget.jsx      # Google Gemini 2.0 AI virtual assistant
│       ├── ContactForm.jsx        # Form submission handling to backend
│       ├── Hero3D.jsx             # 3D R3F hero scene with floating shapes
│       ├── Navbar.jsx             # Fixed responsive navigation bar
│       ├── ProjectCard.jsx        # Interactive 3D tilt project cards
│       ├── SectionWrapper.jsx     # Consistent section padding & reveal
│       ├── ServicesCarousel.jsx   # Swiper carousel of services
│       └── SkillsGlobe.jsx        # 3D rotating skills tag sphere
├── vercel.json               # Vercel rewrite configuration for SPA & API
└── vite.config.js            # Vite configuration with React & Tailwind plugins
```

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)
- **MongoDB**: A running local instance (`mongodb://localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URI.
- **Google Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tayabawan19/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Fill in your configuration details:
   ```env
   # Google Gemini API Key for Chatbot Assistant
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

   # MongoDB Connection String
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

   # Server Port (optional, defaults to 5000)
   PORT=5000
   ```

---

## 💻 Running the Application

This project uses `concurrently` to run both the Vite client and the Express backend simultaneously during local development:

### 1. Run Client + Server Concurrently (Recommended)
```bash
npm run dev
```
- Client runs at: `http://localhost:5173`
- Backend runs at: `http://localhost:5000`

### 2. Run Individually
- **Client only**:
  ```bash
  npm run dev:client
  ```
- **Server only**:
  ```bash
  npm run dev:server
  ```

### 3. Build for Production
```bash
npm run build
```
Builds the static assets into the `dist/` folder.

### 4. Run Production Server
```bash
npm start
```
Runs `node server.js`, which serves the production `dist/` bundle and provides the `/api/messages` REST endpoint.

---

## 📡 API Reference

### Send Contact Message

Saves an inquiry message sent through the contact form into MongoDB.

- **Endpoint**: `POST /api/messages`
- **Headers**: `Content-Type: application/json`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "Hi Tayyab, I would like to discuss an AI Engineering project."
}
```

**Successful Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Message saved successfully"
}
```

**Error Response (`400 Bad Request`):**
```json
{
  "error": "Name, email, and message are required"
}
```

---

## 🚢 Deployment

### Deploying to Vercel
The repository includes a pre-configured `vercel.json`:
1. Push your code to GitHub.
2. Import the repository into your [Vercel Dashboard](https://vercel.com).
3. Set your Environment Variables in the Vercel project settings:
   - `VITE_GEMINI_API_KEY`
   - `MONGODB_URI`
4. Deploy! Vercel handles static site generation and runs `/api/index.js` as a serverless function.

### Deploying to Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Set the Build Command: `npm install && npm run build`
3. Set the Start Command: `npm start`
4. Add environment variables (`MONGODB_URI`, `VITE_GEMINI_API_KEY`, `NODE_ENV=production`).

---

## 👨‍💻 About The Author

**Muhammad Tayyab Tanveer**  
*BS Software Engineering Student @ COMSATS University Islamabad (5th Semester)*  
*Alumnus: AI-Powered Data Analysis Remote Internship (Excelerate / RIT Tiger STRIPES)*  

- 🌐 **Website**: [tayab.me](https://tayab.me)
- 📍 **Location**: Islamabad, Pakistan
- 📧 **Email**: [tayabawan.in@gmail.com](mailto:tayabawan.in@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/tayyab-tanveer](https://www.linkedin.com/in/tayyab-tanveer-1481b7348)
- 🐙 **GitHub**: [@tayabawan19](https://github.com/tayabawan19)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.
