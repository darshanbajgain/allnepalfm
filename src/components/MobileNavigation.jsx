import { Radio, Heart, Settings, Info } from "lucide-react";
import { Button } from "@components/ui/button";

export default function MobileNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: "all-stations", icon: Radio, label: "Stations" },
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "about", icon: Info, label: "About" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          className={`flex-1 flex flex-col items-center justify-center h-full ${
            activeTab === tab.id
              ? "text-blue-500 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => onTabChange(tab.id, tab.path)}
        >
          <tab.icon className="h-5 w-5 mb-1" />
          <span className="text-xs">{tab.label}</span>
        </Button>
      ))}
    </nav>
  );
}
