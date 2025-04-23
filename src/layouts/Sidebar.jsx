import { Home, Heart, Settings, Info, Radio } from "lucide-react";
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
import PropTypes from "prop-types";

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
      <SidebarHeader className="flex flex-col p-1 items-center mt-6">
        <div className="flex items-center gap-3 mb-8">
          <Radio size={32} strokeWidth={2} className="text-primary" />
          <span className="text-xl text-foreground font-semibold leading-6 tracking-wide">
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
                    "w-full justify-start px-4 py-2 h-11 text-sm font-medium rounded-md",
                    "text-foreground",
                    "hover:bg-primary/20 hover:text-primary",
                    "transition-all duration-200",
                    "disabled:opacity-40 disabled:pointer-events-none",
                    activeTab === tab.id &&
                      "bg-primary/10 text-primary hover:bg-primary/20"
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

AppSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
