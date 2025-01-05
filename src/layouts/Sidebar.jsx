import { Radio, Heart, Settings, Info } from "lucide-react";
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
  { id: "all-stations", icon: Radio, label: "All Stations", path: "/" },
  { id: "favorites", icon: Heart, label: "Favorites", path: "/favorites" },
  { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  { id: "about", icon: Info, label: "About", path: "/about" },
];

export function AppSidebar({ activeTab, onTabChange }) {
  return (
    <Sidebar className="fixed h-full w-64 bg-primary text-white">
      <SidebarHeader className="p-4">
        <div className="p-2 mx-auto flex items-center justify-center">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            Online Nepali FM
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="container mt-4">
        <SidebarMenu className="space-y-2">
          {tabs.map((tab) => (
            <SidebarMenuItem key={tab.id}>
              <SidebarMenuButton asChild isActive={activeTab === tab.id}>
                <Button
                  variant="ghost"
                  disabled={tab.id === "settings" || tab.id === "favorites"} // Disable if tabid is settings and fav
                  className={cn(
                    "w-full bg-transparent justify-start px-6 py-2 h-12 text-sm rounded-xl font-medium text-white hover:bg-white/10",
                    activeTab === tab.id && "bg-white/20"
                  )}
                  onClick={() => onTabChange(tab.id, tab.path)}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
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
