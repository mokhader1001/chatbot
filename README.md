# Bile Initiative Bot

A full-stack chatbot built with React and Node.js, powered by the Gemini API. It helps students learn about programming, ICT, software development, and the Bile Initiative programme.

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
2. The **server** (Express) receives the message and forwards it to the **Gemini API** with a system prompt that defines the bot's personality and topic scope.
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

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the API key you got from Google AI Studio.

### 3. Setup the client

```bash
cd ../client
npm install
```

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

- **Frontend:** React 19, Vite, Bootstrap 5
- **Backend:** Node.js, Express 5
- **API:** Google Gemini (gemini-3.5-flash-lite)
