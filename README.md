# Bile Initiative Bot — Documentation Guidelines

A full-stack chatbot built with React and Node.js, powered by the Gemini API. It helps students learn about programming, ICT, software development, and the Bile Initiative programme.

---

## Libraries & Dependencies

### Server Libraries

| Library | Version | Description |
|---------|---------|-------------|
| `express` | 5.2.1 | Web framework for building the REST API |
| `@google/genai` | 2.18.0 | Google Gemini AI SDK for generating chat responses |
| `cors` | 2.8.6 | Enables Cross-Origin requests between client and server |
| `dotenv` | 17.4.2 | Loads environment variables from `.env` file |
| `nodemon` | 3.1.14 | (dev) Auto-restarts server on file changes |

### Client Libraries

| Library | Version | Description |
|---------|---------|-------------|
| `react` | 19.2.8 | UI library for building the chat interface |
| `react-dom` | 19.2.8 | React rendering for the browser |
| `vite` | 8.2.0 | (dev) Fast build tool and dev server |
| `@vitejs/plugin-react` | 6.0.4 | (dev) React support for Vite |
| `eslint` | 10.8.0 | (dev) Code linting |
| `eslint-plugin-react-hooks` | 7.1.1 | (dev) Linting rules for React hooks |
| `eslint-plugin-react-refresh` | 0.5.3 | (dev) Linting rules for React Fast Refresh |

### CDN (loaded via `index.html`)

| Library | Version | Description |
|---------|---------|-------------|
| Bootstrap | 5.3.8 | CSS framework for layout and styling |

---

## Project Structure

```
chatbot/
├── client/                 # Frontend (React + Vite)
│   ├── public/             # Static assets (favicon, icons)
│   ├── src/
│   │   ├── App.jsx         # Main chat component
│   │   ├── App.css         # Styles
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template (loads Bootstrap CDN)
│   ├── vite.config.js      # Vite configuration
│   └── package.json
│
├── server/                 # Backend (Express)
│   ├── server.js           # API server + Gemini integration
│   ├── .env                # API key (not tracked by git)
│   └── package.json
│
└── .gitignore
```

---

## How It Works

1. The **client** (React) sends the user's message to the **server** via a POST request to `/api/chat`.
2. The **server** (Express) receives the message and forwards it to the **Gemini API** using the `@google/genai` SDK with a system prompt that defines the bot's personality and topic scope.
3. Gemini generates a response, the server sends it back to the client, and the client displays it in the chat window.

---

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API Key"** in the left sidebar.
4. Click **"Create API Key"** and select a Google Cloud project (or create one).
5. Copy the generated API key.

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/mokhader1001/chatbot.git
cd chatbot
```

### 2. Setup the server

Install server dependencies:

```bash
cd server
npm install
```

This installs `express`, `@google/genai`, `cors`, `dotenv`, and `nodemon`.

Create a `.env` file inside the `server/` folder:

```
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the API key you got from Google AI Studio.

### 3. Setup the client

Install client dependencies:

```bash
cd ../client
npm install
```

This installs `react`, `react-dom`, `vite`, and the dev tooling (ESLint, plugins).

### 4. Run the project

Open **two terminals**:

**Terminal 1 — Start the server:**

```bash
cd server
npm run dev
```

The server runs on `http://localhost:5000`.

**Terminal 2 — Start the client:**

```bash
cd client
npm run dev
```

The client runs on `http://localhost:5173`.

Open `http://localhost:5173` in your browser to use the chatbot.

---

## Technologies Used

- **Frontend:** React 19, Vite 8, Bootstrap 5
- **Backend:** Node.js, Express 5
- **AI:** Google Gemini API (`@google/genai` SDK, model: gemini-3.5-flash-lite)
- **Tooling:** ESLint, Nodemon
