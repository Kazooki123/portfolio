"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Mail, MessageSquare, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Contact Me
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          {[
            {
              Icon: Twitter,
              href: "https://x.com/Mr_Unknown157?s=09",
              color: "text-blue-400",
            },
            {
              Icon: Github,
              href: "https://github.com/Kazooki123",
              color: "text-gray-800",
            },
            {
              Icon: Mail,
              href: "mailto:mgamerdinge146@gmail.com",
              color: "text-red-500",
            },
            {
              Icon: MessageSquare,
              href: "https://discord.com/users/1050388367759654963",
              color: "text-indigo-500",
            },
            {
              Icon: Linkedin,
              href: "https://www.linkedin.com/in/yourusername",
              color: "text-blue-700",
            },
          ].map(({ Icon, href, color }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${color} hover:text-white transition-colors duration-200`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 border-none"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 border-none"
          />
          <Textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 border-none"
            rows={4}
          />
          <Button
            type="submit"
            className="w-full bg-white text-purple-600 hover:bg-opacity-90 transition-colors duration-200"
          >
            Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
