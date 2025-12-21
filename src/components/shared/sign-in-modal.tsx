"use client";

import { useUIStore } from "@/store/ui.store";
import { SignIn } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";

export function SignInModal() {
  const { isSignInModalOpen, setSignInModalOpen, signInRedirectUrl } =
    useUIStore();

  const handleClose = useCallback(() => {
    setSignInModalOpen(false);
  }, [setSignInModalOpen]);

  // Build post-login URL with original redirect preserved
  const postLoginUrl = useMemo(() => {
    if (signInRedirectUrl) {
      return `/post-login?redirect_url=${encodeURIComponent(signInRedirectUrl)}`;
    }
    return "/post-login";
  }, [signInRedirectUrl]);

  return (
    <AnimatePresence>
      {isSignInModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative rounded-2xl bg-white p-2 shadow-2xl">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Clerk SignIn component */}
              <SignIn
                routing="hash"
                forceRedirectUrl={postLoginUrl}
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none",
                    headerTitle: "text-xl font-semibold",
                    headerSubtitle: "text-muted-foreground",
                    formButtonPrimary:
                      "bg-primary hover:bg-primary/90 text-white",
                  },
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
