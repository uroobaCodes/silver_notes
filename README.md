# Silver Notes

A modern, AI-powered note-taking web application built with Next.js, Prisma, Supabase, and OpenAI.

---

## Features

- ✍️ **Create, edit, and organize notes** with a clean, intuitive interface
- 🔍 **Fast search** using Fuse.js for instant filtering
- 🤖 **AI assistance**: Summarize notes with integrated OpenAI features
- 🔒 **User authentication** for secure, personalized note management
- 🌗 **Dark mode** and responsive design for a seamless experience on any device
- 🗂️ **Sidebar navigation** for quick access to all your notes
- 🚀 **Real-time updates** with debounced saving for smooth editing
- 🛡️ **Robust code quality**: Pull requests, careful merge conflict resolution and structured branching strategy

---

## Tech Stack

- **Frontend:** Next.js, React, Redux, Tailwind CSS
- **Backend:** Prisma ORM, Supabase (PostgreSQL)
- **AI Integration:** OpenAI API
- **Authentication:** Supabase Auth
- **State Management:** Redux
- **Search:** Fuse.js

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database (Supabase or local)
- OpenAI API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/uroobaCodes/silver_notes.git
   cd silver_notes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   -Set up `.env.local` and fill in your database and OpenAI credentials.

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Project Structure

- `/src/app` – Next.js app directory (pages, layout, API routes)
- `/src/components` – UI and feature components
- `/src/db` – Prisma schema and database setup
- `/src/store` – Redux store and slices
- `/src/actions` – Server actions (e.g., notes, users)
- `/src/lib` – Utility functions and constants

---

## Branching Strategy

- `master`: Production-ready code
- `dev`: Main development branch
- `feature/*` or `feat/*`: Feature-specific branches
- Pull requests, careful merge conflict resolution and structured branching strategy

---

## AI Features

Silver Notes leverages OpenAI to help users:
- Summarize existing notes

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [OpenAI](https://openai.com/)
- [Fuse.js](https://fusejs.io/)
