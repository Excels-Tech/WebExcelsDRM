import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AIAssistantChat } from "./ai-assistant-chat";

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-primary hover-elevate active-elevate-2 cursor-pointer flex items-center justify-center shadow-lg z-40 rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-open-ai-assistant"
      >
        <Sparkles className="w-6 h-6 text-primary-foreground" />
      </div>

      <AIAssistantChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
