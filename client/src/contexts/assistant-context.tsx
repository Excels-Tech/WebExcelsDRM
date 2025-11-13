import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

type UserRole = "Sales Executive" | "Assistant Manager" | "Manager" | "HOD" | "Admin";

interface AssistantContextValue {
  currentScreen: string;
  userRole: UserRole;
  userName: string;
  screenData: Record<string, any>;
  setScreenData: (data: Record<string, any>) => void;
  setUserRole: (role: UserRole) => void;
  setUserName: (name: string) => void;
}

const AssistantContext = createContext<AssistantContextValue | undefined>(undefined);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [userRole, setUserRole] = useState<UserRole>("Sales Executive");
  const [userName, setUserName] = useState("John Doe");
  const [screenData, setScreenData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Reset screen data when location changes
    setScreenData({});
  }, [location]);

  return (
    <AssistantContext.Provider
      value={{
        currentScreen: location,
        userRole,
        userName,
        screenData,
        setScreenData,
        setUserRole,
        setUserName,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error("useAssistant must be used within AssistantProvider");
  }
  return context;
}
