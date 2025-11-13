import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  userRole: string;
  userName: string;
  onPeriodChange?: (period: string) => void;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

export function TopBar({ userRole, userName, onPeriodChange, onThemeToggle, isDark }: TopBarProps) {
  const [period, setPeriod] = useState("TD");

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onPeriodChange?.(value);
    console.log("Period changed to:", value);
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b bg-background px-4 py-3">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Role:</span>
          <Badge variant="secondary" data-testid="badge-user-role">{userRole}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-32" data-testid="select-time-period">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TD">Today</SelectItem>
            <SelectItem value="WC">Weekly</SelectItem>
            <SelectItem value="MN">Monthly</SelectItem>
            <SelectItem value="QT">Quarterly</SelectItem>
            <SelectItem value="YR">Yearly</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onThemeToggle?.();
            console.log("Theme toggled");
          }}
          data-testid="button-theme-toggle"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="button-user-menu">
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel data-testid="text-user-name">{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="button-profile">Profile</DropdownMenuItem>
            <DropdownMenuItem data-testid="button-settings">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="button-logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
