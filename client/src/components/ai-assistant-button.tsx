import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { AIAssistantChat } from "./ai-assistant-chat";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-40"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-open-ai-assistant"
          >
            <Sparkles className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>WebX-AI Assistant</p>
        </TooltipContent>
      </Tooltip>

      <AIAssistantChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
