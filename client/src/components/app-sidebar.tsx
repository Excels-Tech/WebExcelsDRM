import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileText,
  UserCircle,
  ClipboardList,
  FolderOpen,
  Briefcase,
  BarChart3,
  GraduationCap,
  ChevronDown,
  CheckSquare,
  UserPlus,
  FileSearch,
  Database,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "wouter";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Attendance & Leave",
    icon: CalendarCheck,
    url: "/attendance",
  },
  {
    title: "Loan Request",
    icon: FileText,
    url: "/loan-request",
  },
  {
    title: "Customer Section",
    icon: Users,
    items: [
      { title: "Duplicate Check", url: "/customers/duplicate-check", icon: FileSearch },
      { title: "Add Customer", url: "/customers/add", icon: UserPlus },
      { title: "Temporary Contacts", url: "/customers/temp", icon: UserCircle },
      { title: "Private Pool", url: "/customers/private-pool", icon: Database },
      { title: "Service Pool", url: "/customers/service-pool", icon: Database },
      { title: "GM Pool", url: "/customers/gm-pool", icon: Database },
    ],
  },
  {
    title: "PMS",
    icon: ClipboardList,
    items: [
      { title: "Task Creation", url: "/pms/tasks", icon: CheckSquare },
      { title: "Project Status", url: "/pms/status", icon: BarChart3 },
    ],
  },
  {
    title: "Workspace",
    icon: Briefcase,
    url: "/workspace",
  },
  {
    title: "User Reports",
    icon: BarChart3,
    items: [
      { title: "Loan Reports", url: "/reports/loan", icon: FileText },
      { title: "VAS Reports", url: "/reports/vas", icon: FileText },
      { title: "GM Reports", url: "/reports/gm", icon: FileText },
      { title: "BV Reports", url: "/reports/bv", icon: FileText },
    ],
  },
  {
    title: "Training Center",
    icon: GraduationCap,
    items: [
      { title: "DRM Training", url: "/training/drm", icon: FolderOpen },
      { title: "SEO Training", url: "/training/seo", icon: FolderOpen },
      { title: "Alibaba Training", url: "/training/alibaba", icon: FolderOpen },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold px-4 py-3">
            WebExcels DRM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) =>
                item.items ? (
                  <Collapsible key={item.title} defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton data-testid={`button-sidebar-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url} data-testid={`link-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                  <subItem.icon className="w-4 h-4" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
