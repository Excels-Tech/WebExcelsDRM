import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { AssistantProvider } from "@/contexts/assistant-context";
import { AIAssistantButton } from "@/components/ai-assistant-button";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  const style = {
    "--sidebar-width": "280px",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AssistantProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <TopBar
                  userRole="Sales Executive"
                  userName="John Doe"
                  isDark={theme === "dark"}
                  onThemeToggle={toggleTheme}
                />
                <Router />
              </div>
            </div>
          </SidebarProvider>
          <AIAssistantButton />
          <Toaster />
        </AssistantProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
