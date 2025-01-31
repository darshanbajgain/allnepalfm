import { Home, Heart, Settings, Info, AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const tabs = [
  { id: "all-stations", icon: Home, label: "Home", path: "/" },
  { id: "favorites", icon: Heart, label: "Favorites", path: "/favorites" },
  { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  { id: "about", icon: Info, label: "About", path: "/about" },
];

export function AppSidebar({ activeTab, onTabChange }) {
  return (
    <Sidebar
      className={cn(
        "fixed h-full w-64 p-4 text-foreground",
        "bg-sidebar",
        "border-r border-border/10"
      )}
    >
      <SidebarHeader className="flex flex-col p-1 items-center mt-4">
        <div className="flex items-center gap-2 mb-8">
          <AudioLines size={36} strokeWidth={2} className="text-primary" />
          <span className="text-xl text-white font-semibold leading-6 tracking-wide">
            Nepali Waves
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-6">
        <SidebarMenu className="space-y-2">
          {tabs.map((tab) => (
            <SidebarMenuItem key={tab.id}>
              <SidebarMenuButton asChild isActive={activeTab === tab.id}>
                <Button
                  variant="ghost"
                  disabled={tab.id === "settings" || tab.id === "favorites"}
                  className={cn(
                    "w-full justify-start px-6 py-2 h-12 text-sm font-medium rounded-[8px] leading-[22px]",
                    "text-white",
                    "hover:bg-primary/60",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    activeTab === tab.id &&
                      "bg-primary text-white hover:bg-primary/25"
                  )}
                  onClick={() => onTabChange(tab.id, tab.path)}
                >
                  <tab.icon className="mr-3 h-6 w-6" />
                  {tab.label}
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
