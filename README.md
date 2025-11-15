# rydzen-frontend

Frontend for the **Rydzen** platform, built with Next.js, Tailwind CSS, and TypeScript.  
Provides a modern, responsive UI for users to interact with the backend API, vehicles, and more.

---

## 🚀 Features

- Built with **Next.js + TypeScript**
- Styled using **Tailwind CSS** for utility-first design
- Supports authentication (login/signup) via JWT tokens
- Communicates with the backend API for vehicle management and CMS
- Responsive UI optimized for desktop and mobile
- Uses absolute imports and modular folder structure for scalability
- Error handling and loading states for better UX

---

## 📁 Project Structure

├── app/ # Pages, layouts, and routing (Next.js)
├── components/ # Reusable UI components
├── context/ # Global state / Context API for auth, data
├── public/ # Static assets (images, icons)
├── styles/ # Tailwind CSS configurations and global styles
├── types/ # TypeScript interfaces / types
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md

---

## 🛠 Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API (or custom hooks)
- **API Communication:** Fetch / Axios to talk to backend
- **Authentication:** JWT-based via backend API

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/rajansharma001/rydzen-frontend.git
cd rydzen-frontend
2. Install dependencies
bash
Copy code
npm install
# or
yarn install
3. Create .env.local file
Add the following (or more) variables, depending on your setup:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ANOTHER_KEY=your_key_here
▶️ Running the Project
Development

bash
Copy code
npm run dev
# or
yarn dev
Production Build

bash
Copy code
npm run build
npm start
# or
yarn build
yarn start

{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}
```
