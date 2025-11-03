import { useState, useEffect, useRef } from "react";
import { SendHorizontal, Bot, X } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../ui/input";
import { useOverlay } from "@/context/AIOverlayContext";

interface ChatbotProps {
  questions: string[];
  answers: Record<string, string>;
}

export default function Chatbot({ questions, answers }: ChatbotProps) {
  const { openOverlay, setOpenOverlay } = useOverlay();
  const open = openOverlay === "chatbot";

  const handleToggle = () => setOpenOverlay(open ? null : "chatbot");
  
  const [messages, setMessages] = useState<
    { id: number; sender: "bot" | "user"; text: string }[]
  >([{ id: 1, sender: "bot", text: "Hi! How can I help you today?" }]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (msgText?: string) => {
    const userMsg = msgText || input;
    if (!userMsg.trim()) return;

    const newId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: newId, sender: "user", text: userMsg },
    ]);
    setInput("");

    // Match query to answers prop
    const query = userMsg.toLowerCase();
    let botReply = "Upgrade for full coverage.";

    for (const key in answers) {
      if (query.includes(key.toLowerCase())) {
        botReply = answers[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: newId + 1, sender: "bot", text: botReply },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="bg-gradient-to-br opacity-25 hover:opacity-100 from-primary to-secondary fixed bottom-[60%] transition-all chatbot-radius ps-[1px] py-[1px] right-0">
        <button
          onClick={() => handleToggle()}
          className="p-4 chatbot-radius bg-card/60 border border-e-0 cursor-pointer border-border"
        >
          <Bot />
        </button>
      </div>

      <div
        className={`fixed flex justify-center items-center z-40 right-0 lg:right-[5%] top-[5%] h-screen w-full lg:w-[500px] ${
          !open && "pointer-events-none"
        }`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              className="transition-all flex flex-col p-[5px] rounded-lg bg-gradient-to-br from-primary to-secondary overflow-hidden"
              initial={{
                opacity: 0,
                width: "200px",
                height: "8%",
                backdropFilter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                width: "100%",
                height: "80%",
                backdropFilter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                width: "100%",
                height: "8%",
                backdropFilter: ["blur(0px)", "blur(2px)", "blur(5px)"],
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
          
              {/* Header */}
              <div className="p-4 items-center flex justify-between">
                <div className="flex items-center text-2xl gap-2">
                  <Bot className="w-5 text-white h-5" />
                  <h2 className="text-2xl text-white font-medium">Chatbot</h2>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => handleToggle()}
                  className="size-5"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Chat Body */}
              <div className="flex flex-col bg-card/90 flex-1 w-full overflow-y-auto rounded-lg px-3">
                <div className="flex-1 rounded-lg mt-3 overflow-y-auto">
                  <div className="space-y-2 mb-4">
                    {messages.map((msg) =>
                      msg.sender === "user" ? (
                        <div key={msg.id} className="flex justify-end">
                          <div className="max-w-[80%] rounded-md w-fit text-white py-2 px-3 bg-secondary/70">
                            {msg.text}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={msg.id}
                          className="flex justify-start items-end gap-2"
                        >
                          <div className="p-2 bg-gradient-to-br from-secondary to-primary rounded-full size-7"></div>
                          <div className="max-w-[75%] rounded-md w-fit py-2 px-3 bg-accent">
                            {msg.text}
                          </div>
                        </div>
                      )
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input + Quick buttons */}
                <div className="py-2 space-y-2 mb-1 flex flex-col items-center">
                  {/* Quick action buttons */}
                  <div className="flex flex-wrap gap-1 items-center w-full">
                    {questions.map((msg, idx) => (
                      <Button
                        key={idx}
                        onClick={() => handleSend(msg)}
                        className="bg-input p-2 h-7 text-foreground hover:text-foreground/50 hover:bg-input/95"
                      >
                        {msg}
                      </Button>
                    ))}
                  </div>

                  {/* Text input */}
                  <div className="flex items-center w-full gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                    />
                    <Button
                      className="bg- text-foreground hover:bg-"
                      onClick={() => handleSend()}
                    >
                      <SendHorizontal className="size-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
