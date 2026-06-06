"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AskArticleProps {
  articleTitle: string;
  articleSlug: string;
  // TODO: sambungkan ke Claude API — kirim pertanyaan + konteks artikel, terima jawaban streaming
}

export default function AskArticle({ articleTitle, articleSlug }: AskArticleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Halo! Saya bisa menjawab pertanyaan tentang artikel "${articleTitle}". Apa yang ingin Anda tanyakan?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: sambungkan ke Claude API dengan konteks artikel (articleSlug)
    console.log("[AI] Tanya tentang artikel:", articleSlug, "| Pertanyaan:", trimmed);

    // Simulasi respons statis
    await new Promise((r) => setTimeout(r, 1200));
    const mockResponse: Message = {
      role: "assistant",
      content:
        "Pertanyaan Anda akan segera dijawab oleh AI. Fitur ini sedang dihubungkan ke Claude API. Untuk sementara, silakan baca artikel lengkapnya atau hubungi tim medis PMI Sumenep melalui WhatsApp.",
    };
    setMessages((prev) => [...prev, mockResponse]);
    setIsLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 sm:relative sm:bottom-auto sm:z-auto">
      {/* Toggle bar */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Tanya tentang berita ini"
          className="flex w-full items-center justify-between border-t border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-lg sm:rounded-xl sm:border min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <ChatIcon />
            <span>Tanya tentang berita ini…</span>
          </div>
          <span className="text-xs text-blue-600 font-medium">Buka</span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="flex flex-col border-t border-[var(--border)] bg-[var(--card)] shadow-2xl sm:rounded-xl sm:border max-h-80">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-bold">
                AI
              </span>
              <span className="text-sm font-semibold">Tanya AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Tutup panel tanya AI"
              className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-[var(--border)] text-[var(--foreground)] rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-[var(--border)] px-3 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-[var(--muted)] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--border)] p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pertanyaan Anda…"
              aria-label="Pertanyaan tentang artikel"
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 min-h-[44px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Kirim pertanyaan"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 active:scale-95 transition"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M2 3h12v8H9l-3 3v-3H2V3z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 2l12 6-12 6V9.5l8-1.5-8-1.5V2z"/>
    </svg>
  );
}
