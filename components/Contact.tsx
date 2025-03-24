/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Linkedin, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { SiDiscord, SiBluesky } from '@icons-pack/react-simple-icons';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! I will get back to you soon.',
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 py-16 px-4">
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row gap-8 z-10">
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Left column - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 text-white"
        >
          <h2 className="text-5xl font-bold mb-6">Get In Touch :3</h2>
          <p className="text-lg text-white/80 mb-8">
            Have a question or want to work together? Feel free to reach out! :3
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <a 
                  href="mailto:mgamerdinge146@gmail.com" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  mgamerdinge146@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <SiDiscord size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium">Discord</h3>
                <a 
                  href="https://discord.com/users/1050388367759654963" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-1"
                >
                  Discord Profile <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-medium mb-4">Connect with me</h3>
            <div className="flex space-x-4">
              {[
                {
                  Icon: <SiBluesky />,
                  href: "https://x.com/Mr_Unknown157?s=09",
                  label: "BlueSky",
                  color: "text-blue-400",
                },
                {
                  Icon: Github,
                  href: "https://github.com/Kazooki123",
                  label: "GitHub",
                  color: "text-gray-200",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/yourusername",
                  label: "LinkedIn",
                  color: "text-blue-400",
                },
              ].map(({ Icon, href, label, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${color} bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Right column - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1"
        >
          <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Send a Message
            </h2>
            
            <AnimatePresence>
              {submitStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert className={`mb-4 ${submitStatus.success ? "bg-green-500/20" : "bg-red-500/20"} border-none text-white`}>
                    {submitStatus.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      {submitStatus.message}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-white/80 text-sm">Your Name</label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/20 text-white placeholder-white/50 border-none focus:ring-2 focus:ring-white/30"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="text-white/80 text-sm">Your Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/20 text-white placeholder-white/50 border-none focus:ring-2 focus:ring-white/30"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="message" className="text-white/80 text-sm">Your Message</label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-white/20 text-white placeholder-white/50 border-none focus:ring-2 focus:ring-white/30"
                  placeholder="Hi, I'd like to talk about..."
                  rows={4}
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 py-6"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
