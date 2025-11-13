import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AIAssistantChat } from "./ai-assistant-chat";

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-1/2 -translate-y-1/2 right-0 bg-primary hover-elevate active-elevate-2 cursor-pointer flex flex-col items-center justify-center gap-2 shadow-lg z-40 rounded-l-lg px-3 py-6"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-open-ai-assistant"
      >
        <Sparkles className="w-6 h-6 text-primary-foreground" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-primary-foreground text-[10px] font-semibold" style={{ writingMode: 'vertical-rl' }}>
            WebX-AI
          </span>
        </div>
      </div>

      <AIAssistantChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
