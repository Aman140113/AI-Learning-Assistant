import { MessageSquare, X, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: "assistant" | "user";
  text: string;
}

const ChatbotButton = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Hello! I'm your AI learning assistant. Ask me anything about your selected domain!" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get the user's selected domain from localStorage
      const domain = localStorage.getItem("selectedDomainName") || "GenAI";

      const res = await fetch("/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, message: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();

      // The API returns { answer, confidence, related_topics, suggested_next_action }
      const answer = data.answer || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Oops! Something went wrong. Please make sure the chatbot server is running and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const hiddenRoutes = ["/", "/result"];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex justify-between items-center bg-primary text-primary-foreground p-4 shadow-sm z-10">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Assistant
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground h-8 w-8 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Message List */}
          <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-muted/10 gap-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card text-foreground border border-border rounded-bl-sm shadow-sm"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-card text-foreground border border-border rounded-bl-sm shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-background border-t border-border">
            <div className="flex items-end gap-2 bg-muted/30 rounded-xl border border-border/50 p-1 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none focus:outline-none resize-none p-2 min-h-[40px] max-h-[120px] text-sm custom-scrollbar"
                rows={1}
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="h-9 w-9 rounded-lg shrink-0 mb-0.5 mr-0.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default ChatbotButton;
