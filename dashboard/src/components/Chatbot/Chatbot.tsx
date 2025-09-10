import { useState } from "react";
import { Send, Bot, X } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: "I’ll analyze that for you…" }]);
    }, 1000);
  };

  return (
    <>
      {/* Toggle Button */}
      <div
        className={`bg-gradient-to-br from-primary to-secondary fixed bottom-[60%] transition-all chatbot-radius ps-[1px] py-[1px] right-0`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="p-4 chatbot-radius bg-card/60 border border-e-0 border-border"
        >
          <Bot />
        </button>
      </div>

      <div
        className={`fixed flex justify-center items-center right-[5%] top-[5%] h-screen w-[500px] pointer-events-none`}
      >
        {/* Chat Window */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="transition-all p-[1px] rounded-lg bg-gradient-to-br from-primary to-secondary"
              initial={{
                opacity: 0,
                width: "5px",
                height: "5px",
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
                width: ["100%", "5px", "5px"],   // shrink width first
                height: ["80%", "80%", "5px"],  // then shrink height
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <Card className="flex flex-col bg-card/90 h-full w-full rounded-lg">
                {/* Header */}
                <CardHeader className="flex flex-row justify-between items-center border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" /> Chatbot
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </Button>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto space-y-2 p-4">
                  {messages.map((msg, idx) => (
                    msg.sender == "bot" ? (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg max-w-[80%] ${
                            "bg-muted text-foreground"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg max-w-[80%] ${
                          "bg-primary ml-auto"
                        }`}
                      >
                        {msg.text}
                      </div>

                    )
                  ))}
                </CardContent>

                {/* Input */}
                <CardFooter className="flex items-center gap-2 border-t p-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 px-3 py-2 rounded-md border bg-background"
                    placeholder="Type a message..."
                  />
                  <Button onClick={handleSend} size="icon">
                    <Send />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
