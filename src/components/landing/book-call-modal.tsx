"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail } from "lucide-react";
import { toast } from "sonner";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! We will get back to you soon.");
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-h-[90vh] overflow-y-auto sm:max-w-2xl bg-background rounded-t-[32px] sm:rounded-[32px] border border-border shadow-2xl relative"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Book a Call</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 focus:border-[#38bdf8] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 focus:border-[#38bdf8] transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">WhatsApp Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 focus:border-[#38bdf8] transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Address</label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 focus:border-[#38bdf8] transition-colors"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">What you need help with?</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 focus:border-[#38bdf8] transition-colors resize-none"
                    placeholder="Tell us briefly about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-glow w-full h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Book Strategy Call <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="border-t border-border pt-6">
                <div className="flex flex-col items-center justify-center text-center gap-2 bg-muted/50 p-4 rounded-2xl">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    For normal enquiries and job positions, please email us at:
                  </p>
                  <a href="mailto:adwiserofficial@gmail.com" className="text-sm font-semibold text-foreground hover:text-[#38bdf8] transition-colors">
                    adwiserofficial@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
