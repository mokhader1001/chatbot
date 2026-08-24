import { useState } from "react";

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim() || loading) return;

        const userMessage = message.trim();

        setMessages((prev) => [
            ...prev,
            { role: "user", text: userMessage },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: data.reply || data.error || "No response received.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: "Could not connect to Bile Initiative Bot.",
                },
            ]);
        }

        setLoading(false);
    };

    const useSuggestion = (text) => {
        setMessage(text);
    };

    const formatBotText = (text) => {
        return text
            .replace(/\*\*/g, "")
            .replace(/^\s*\*\s+/gm, "• ")
            .replace(/^\s*-\s+/gm, "• ")
            .split("\n")
            .filter((line) => line.trim() !== "");
    };

    return (
        <div
            className="d-flex flex-column bg-white"
            style={{
                height: "100vh",
                overflow: "hidden",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
            {/* HEADER */}
            <header
                className="d-flex align-items-center justify-content-between px-4 border-bottom bg-white"
                style={{
                    height: "64px",
                    minHeight: "64px",
                }}
            >
                <h5 className="mb-0 fw-bold text-primary">
                    Bile Initiative Bot
                </h5>

                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-primary rounded-pill px-4"
                    >
                        Log in
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary rounded-pill px-4"
                    >
                        Sign up
                    </button>
                </div>
            </header>

            {/* CHAT AREA */}
            <main className="flex-grow-1 overflow-auto bg-white">
                <div
                    className="container"
                    style={{
                        maxWidth: "820px",
                        minHeight: "100%",
                        paddingTop: messages.length === 0 ? "11vh" : "40px",
                        paddingBottom: "150px",
                    }}
                >
                    {/* WELCOME */}
                    {messages.length === 0 && (
                        <div className="text-center">
                            <h1
                                className="fw-bold mb-2"
                                style={{
                                    fontSize: "32px",
                                    color: "#202124",
                                }}
                            >
                                How can I help you today?
                            </h1>

                            <p className="text-secondary mb-5">
                                Ask Bile Initiative Bot about programming, ICT,
                                software development, or Bile Initiative.
                            </p>

                            {/* SUGGESTIONS */}
                            <div className="row g-3 text-start">
                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        className="btn w-100 text-start p-3 border rounded-4 bg-light"
                                        onClick={() =>
                                            useSuggestion(
                                                "Explain React useState in simple terms"
                                            )
                                        }
                                    >
                                        <div className="fw-semibold mb-1">
                                            💻 Learn React
                                        </div>

                                        <small className="text-secondary">
                                            Explain React useState simply
                                        </small>
                                    </button>
                                </div>

                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        className="btn w-100 text-start p-3 border rounded-4 bg-light"
                                        onClick={() =>
                                            useSuggestion(
                                                "What is the Bile Initiative?"
                                            )
                                        }
                                    >
                                        <div className="fw-semibold mb-1">
                                            🎓 Bile Initiative
                                        </div>

                                        <small className="text-secondary">
                                            Learn about the programme
                                        </small>
                                    </button>
                                </div>

                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        className="btn w-100 text-start p-3 border rounded-4 bg-light"
                                        onClick={() =>
                                            useSuggestion(
                                                "Teach me Node.js step by step"
                                            )
                                        }
                                    >
                                        <div className="fw-semibold mb-1">
                                            🚀 Learn Node.js
                                        </div>

                                        <small className="text-secondary">
                                            Start backend development
                                        </small>
                                    </button>
                                </div>

                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        className="btn w-100 text-start p-3 border rounded-4 bg-light"
                                        onClick={() =>
                                            useSuggestion(
                                                "Give me a MERN stack project idea"
                                            )
                                        }
                                    >
                                        <div className="fw-semibold mb-1">
                                            💡 Project Ideas
                                        </div>

                                        <small className="text-secondary">
                                            Get a MERN stack project idea
                                        </small>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MESSAGES */}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`d-flex mb-4 ${msg.role === "user"
                                    ? "justify-content-end"
                                    : "justify-content-start"
                                }`}
                        >
                            <div
                                style={{
                                    maxWidth: msg.role === "user" ? "70%" : "100%",
                                    width: msg.role === "bot" ? "100%" : "auto",
                                    textAlign: "left",
                                }}
                            >
                                {/* BOT NAME */}
                                {msg.role === "bot" && (
                                    <div className="fw-semibold text-primary mb-2">
                                        Bile Initiative Bot
                                    </div>
                                )}

                                {/* USER MESSAGE */}
                                {msg.role === "user" && (
                                    <div
                                        className="bg-light border px-4 py-3 text-dark"
                                        style={{
                                            borderRadius: "20px 20px 5px 20px",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                )}

                                {/* BOT MESSAGE */}
                                {msg.role === "bot" && (
                                    <div className="text-start text-dark">
                                        {formatBotText(msg.text).map((line, i) => {
                                            const cleanLine = line.trim();

                                            const isBullet = cleanLine.startsWith("•");

                                            const isHeading =
                                                cleanLine.endsWith(":") &&
                                                cleanLine.length < 55;

                                            if (isBullet) {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="d-flex align-items-start gap-2 mb-2"
                                                        style={{
                                                            lineHeight: "1.7",
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        <span className="text-primary fw-bold">
                                                            •
                                                        </span>

                                                        <span>
                                                            {cleanLine
                                                                .replace("•", "")
                                                                .trim()}
                                                        </span>
                                                    </div>
                                                );
                                            }

                                            if (isHeading) {
                                                return (
                                                    <h6
                                                        key={i}
                                                        className="fw-bold mt-4 mb-2"
                                                    >
                                                        {cleanLine}
                                                    </h6>
                                                );
                                            }

                                            return (
                                                <p
                                                    key={i}
                                                    className="mb-3"
                                                    style={{
                                                        lineHeight: "1.7",
                                                        fontSize: "15px",
                                                    }}
                                                >
                                                    {cleanLine}
                                                </p>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* LOADING */}
                    {loading && (
                        <div className="mb-4">
                            <div className="fw-semibold text-primary mb-1">
                                Bile Initiative Bot
                            </div>

                            <div className="d-flex align-items-center text-secondary">
                                Thinking

                                <div
                                    className="spinner-border spinner-border-sm ms-2"
                                    role="status"
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* INPUT */}
            <div
                className="position-fixed bottom-0 start-0 w-100 bg-white"
                style={{
                    padding: "12px 20px 10px",
                }}
            >
                <form
                    onSubmit={sendMessage}
                    className="mx-auto"
                    style={{
                        maxWidth: "780px",
                    }}
                >
                    <div
                        className="d-flex align-items-center bg-white px-3 py-2"
                        style={{
                            border: "1px solid #dedede",
                            borderRadius: "30px",
                            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                        }}
                    >
                        <button
                            type="button"
                            className="btn border-0 text-secondary fs-4 p-1 me-2"
                        >
                            +
                        </button>

                        <input
                            type="text"
                            className="form-control border-0 shadow-none"
                            placeholder="Ask Bile Initiative Bot"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={loading}
                            style={{
                                fontSize: "15px",
                                background: "transparent",
                                padding: "12px 5px",
                            }}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                            disabled={!message.trim() || loading}
                            style={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                fontSize: "18px",
                            }}
                        >
                            ↑
                        </button>
                    </div>

                    <div className="text-center mt-2">
                        <small
                            className="text-secondary"
                            style={{
                                fontSize: "11px",
                            }}
                        >
                            Bile Initiative Bot can make mistakes. Please verify important information.
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;