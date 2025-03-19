import React, { useState } from "react";
import nlp from "compromise";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const botResponse = { text: processMessage(input), sender: "bot" };

    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  const processMessage = (message) => {
    const doc = nlp(message.toLowerCase());

    if (doc.has("hello") || doc.has("hi") || doc.has("hey")) {
        return "Hello! How can I help you today?";
      }
      if (doc.has("bye") || doc.has("goodbye")) {
        return "Goodbye! Have a wonderful day!";
      }
      if (doc.has("validate") && doc.has("entrance")) {
        return "Students can validate their entrance by entering the necessary details on the website. This ensures their entry is recorded properly.";
      }
      if (doc.has("what") && doc.has("website") && doc.has("do")) {
        return "Our website helps validate and record students' time in and time out within the library.";
      }
      if (doc.has("export") && doc.has("excel")) {
        return "You can easily export the records to Excel by clicking the 'Download CSV' button on the records page.";
      }
      if (doc.has("which course") && doc.has("most")) {
        return "From the records, it seems that IT students frequent the library the most.";
      }

    return "I'm not sure I understand. Can you rephrase?";
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-20 right-6 p-4 bg-amber-500 text-white rounded-full shadow-lg flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg border overflow-hidden"
          >
            {/* Chat Header with Close Button */}
            <div className="bg-red-800 text-white p-3 font-semibold flex justify-between items-center">
              Chatbot
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-64 p-3 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 w-fit my-1 rounded ${
                    msg.sender === "user" ? "bg-amber-300 text-right justify-self-end" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex p-1 border-t border-gray-300">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()} 
                    className="flex-1 p-2 border rounded"
                    placeholder="Type a message..."
                    />
                <button onClick={handleSend} className="ml-2 p-2 bg-red-800 text-white rounded">
                    Send
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
