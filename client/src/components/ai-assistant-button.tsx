import { AIAssistantChat } from "./ai-assistant-chat";

export function AIAssistantButton() {
  return (
    <div className="w-96 border-l border-border bg-background">
      <AIAssistantChat isOpen={true} onClose={() => {}} />
    </div>
  );
}
