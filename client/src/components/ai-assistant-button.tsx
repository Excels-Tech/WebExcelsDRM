import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AIAssistantChat } from "./ai-assistant-chat";

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-0 right-0 h-full w-16 bg-primary hover-elevate active-elevate-2 cursor-pointer flex flex-col items-center justify-center gap-3 shadow-lg z-40 border-l border-primary-foreground/10"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-open-ai-assistant"
      >
        <Sparkles className="w-8 h-8 text-primary-foreground" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-primary-foreground text-xs font-semibold writing-mode-vertical transform rotate-180">
            WebX-AI
          </span>
          <span className="text-primary-foreground/80 text-xs writing-mode-vertical transform rotate-180">
            Assistant
          </span>
        </div>
      </div>

      <AIAssistantChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
