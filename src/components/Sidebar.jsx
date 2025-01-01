import { Radio, Heart, Settings, Info } from "lucide-react";
import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "all-stations", icon: Radio, label: "All Stations" },
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "about", icon: Info, label: "About" },
  ];

  return (
    <div className="flex flex-col w-[240px] h-screen fixed left-0 top-0 bg-primary text-white">
      {/* Navigation section */}
      <nav className="flex-1 py-6">
        <div className="p-2 mx-auto flex items-center justify-center">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            Online Nepali FM
          </h1>
        </div>
        <div className="container max-w-[230px] mx-auto my-8 space-y-2">
          {tabs.map((tab) => (
            <div key={tab.id}>
              <Button
                className={cn(
                  "w-full bg-transparent justify-start px-6 py-2 h-12 text-sm rounded-xl font-medium text-white hover:bg-white/10",
                  activeTab === tab.id && "bg-white/20"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                {tab.label}
              </Button>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
