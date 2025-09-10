import { useState } from "react";
import { Send, MessageCircle, Bot } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
      {/* <div className={`bg-gradient-to-br from-primary to-secondary fixed bottom-[60%] transition-all chatbot-radius ps-[1px] py-[1px] ` + ( open ? `-right-15` : `right-0` )}> */}
      <div className={`bg-gradient-to-br from-primary to-secondary fixed bottom-[60%] transition-all chatbot-radius ps-[1px] py-[1px] ` + ( `right-0` )}>
        <button
          onClick={() => setOpen(!open)}
          className=" p-4 chatbot-radius bg-card/60 border border-e-0 border-border"
        >
          <Bot />
        </button>
      </div>

      <div className={`fixed flex justify-center items-center right-[5%] top-[5%] h-screen w-[500px] ` + ( !open && `hidden` )}>
        {/* Chat Window */}
        <AnimatePresence>
          {open && (
            <motion.div
              className=" bg-card border border-border transition-all p-2 rounded-lg"
              initial={{
                opacity: 0, width: "5px", height: "5px"
              }}
              animate={{
                opacity: 1, width: "100%", height: "80%"
              }}
              transition={{
                duration: 0.4
              }}
              exit={{
                opacity: 0, width: "5px", height: "5px"
              }}
            >
              <Card>

              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
