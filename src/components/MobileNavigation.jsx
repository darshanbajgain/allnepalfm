import { Radio, Heart, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

export default function MobileNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: "all-stations", icon: Radio, label: "Stations", path: "/" },
    { id: "favorites", icon: Heart, label: "Favorites", path: "/favorites" },
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
    { id: "about", icon: Info, label: "About", path: "/about" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/30 flex justify-around items-center h-16 z-40 shadow-lg">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          disabled={tab.id === "settings" || tab.id === "favorites"}
          className={cn(
            "flex-1 flex flex-col items-center justify-center text-sm font-medium h-full",
            "text-muted-foreground hover:text-primary hover:bg-primary/10",
            activeTab === tab.id && "bg-primary/10 text-primary"
          )}
          onClick={() => onTabChange(tab.id, tab.path)}
        >
          <tab.icon className="h-5 w-5 mb-1" />
          <span className="text-xs">{tab.label}</span>
        </Button>
      ))}
    </nav>
  );
}

MobileNavigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
