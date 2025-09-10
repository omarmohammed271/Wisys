import { useState, useEffect, useRef } from "react";
import { SendHorizontal, Bot, X } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../ui/input";

// Quick suggestion buttons
const messageButtons = [
  "Employee turnover analysis",
  "Attendance forecasting",
  "Absenteeism prediction",
  "Performance prediction",
  "Future hiring needs",
];

// Mock responses for predictive HR features
const mockResponses: Record<string, string> = {
  turnover: "High risk employees: John Doe (87%), Jane Smith (76%)",
  attendance:
    "Forecasted attendance shows 92% avg next month with mild dip in Week 3.",
  absenteeism: "Expected absenteeism next week is 12%.",
  performance:
    "Predicted performance distribution: High 60%, Medium 30%, Low 10%.",
  hiring: "Forecasted headcount needs: Sales +5, HR +2, Engineering +8.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; sender: "bot" | "user"; text: string }[]
  >([
    { id: 1, sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Ref to track last message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
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

    // Match query to mock responses
    const query = userMsg.toLowerCase();
    let botReply = "Let's stay on topic.";

    if (query.includes("turnover")) {
      botReply = mockResponses.turnover;
    } else if (query.includes("attendance")) {
      botReply = mockResponses.attendance;
    } else if (query.includes("absenteeism")) {
      botReply = mockResponses.absenteeism;
    } else if (query.includes("performance")) {
      botReply = mockResponses.performance;
    } else if (query.includes("hiring") || query.includes("headcount")) {
      botReply = mockResponses.hiring;
    }

    // Simulate delay
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
      <div className="bg-gradient-to-br from-primary to-secondary fixed bottom-[60%] transition-all chatbot-radius ps-[1px] py-[1px] right-0">
        <button
          onClick={() => setOpen(!open)}
          className="p-4 chatbot-radius bg-card/60 border border-e-0 border-border"
        >
          <Bot />
        </button>
      </div>

      <div
        className={`fixed flex justify-center items-center right-[5%] top-[5%] h-screen w-[500px] ${
          !open && "pointer-events-none"
        }`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              className="transition-all flex flex-col p-[5px] rounded-lg bg-gradient-to-br from-primary to-secondary overflow-hidden"
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
                width: ["100%", "5px", "5px"], // shrink width first
                height: ["80%", "80%", "5px"], // then shrink height
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              {/* Header */}
              <div className="p-4 items-center flex justify-between">
                <div className="flex items-center text-2xl gap-2">
                  <Bot className="w-5 h-5" />
                  <h2 className="text-2xl font-medium">Chatbot</h2>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="size-5"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Chat Body */}
              <div className="flex flex-col bg-card/90 flex-1 w-full overflow-y-auto rounded-lg px-3">
                {/* Messages */}
                <div className="flex-1 rounded-lg mt-3 overflow-y-auto">
                  <div className="space-y-2 mb-4">
                    {messages.map((msg) =>
                      msg.sender === "user" ? (
                        <div key={msg.id} className="flex justify-end">
                          <div className="max-w-[80%] rounded-md w-fit py-2 px-3 bg-secondary/70">
                            {msg.text}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={msg.id}
                          className="flex justify-start items-end gap-2"
                        >
                          <div className="p-2 bg-gradient-to-br from-secondary to-primary rounded-full size-7"></div>
                          <div className="max-w-[75%] rounded-md w-fit py-2 px-3 bg-muted">
                            {msg.text}
                          </div>
                        </div>
                      )
                    )}
                    {/* 👇 dummy div to scroll into */}
                    <div ref={messagesEndRef} />
                  </div>
                </div>


                {/* Input + Quick buttons */}
                <div className="py-2 space-y-2 mb-1 flex flex-col items-center">
                  {/* Quick action buttons */}
                  <div className="flex flex-wrap gap-1 items-center w-full">
                    {messageButtons.map((msg, idx) => (
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
