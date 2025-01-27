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
    <Sidebar className="fixed h-full w-64 bg-card p-4 text-white border-none">
      <SidebarHeader className="flex flex-col p-1 items-center mt-4">
        <div className="flex items-center gap-2 mb-8">
          <AudioLines size={36} strokeWidth={2} className=" text-muted font-bold" />
          <span className="text-lg text-muted font-semibold">Nepali Waves</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-6">
        <SidebarMenu className="space-y-2">
          {tabs.map((tab) => (
            <SidebarMenuItem key={tab.id}>
              <SidebarMenuButton asChild isActive={activeTab === tab.id}>
                <Button
                  variant="ghost"
                  disabled={tab.id === "settings" || tab.id === "favorites"} // Disable if tabid is settings and fav
                  className={cn(
                    "w-full justify-start px-6 py-2 h-12 text-sm font-medium rounded-[8px] leading-[22px] text-muted hover:text-primary",
                    activeTab === tab.id && "bg-white text-primary-foreground"
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
      {/* <SidebarFooter className="mt-auto p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 px-4 font-normal"
          onClick={() => onTabChange?.("developer", "/developer")}
        >
          <User className="h-5 w-5" />
          <span>Meet the developer</span>
        </Button>
      </SidebarFooter> */}
    </Sidebar>
  );
}
