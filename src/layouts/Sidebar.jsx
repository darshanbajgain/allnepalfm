import { Home, Heart, Settings, Info, User, AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

const tabs = [
  { id: "all-stations", icon: Home, label: "Home", path: "/" },
  { id: "favorites", icon: Heart, label: "Favorites", path: "/favorites" },
  { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  { id: "about", icon: Info, label: "About", path: "/about" },
];

export function AppSidebar({ activeTab, onTabChange }) {
  return (
    <Sidebar className="fixed h-full w-64 bg-primary text-white">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-4">
          <AudioLines size={36} strokeWidth={2} className=" text-white font-bold" />
          <span className="text-lg font-semibold">Nepali Waves</span>
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
      <SidebarFooter className="mt-auto p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 px-4 font-normal hover:bg-gray-100"
          onClick={() => onTabChange?.("developer", "/developer")}
        >
          <User className="h-5 w-5" />
          <span>Meet the developer</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
