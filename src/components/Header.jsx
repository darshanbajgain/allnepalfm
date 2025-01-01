import { MoonIcon, SunIcon, Menu } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@components/ui/button";
import { useThemeStore } from "@/store/themeStore";

export default function Header({ isMobile, activeTab }) {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const getTitle = () => {
    switch (activeTab) {
      case "all-stations":
        return "All Stations";
      case "favorites":
        return "Favorites";
      case "settings":
        return "Settings";
      case "about":
        return "About";
      default:
        return "Nepali FM Player";
    }
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="px-4 py-4 flex justify-end items-center gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="round" onClick={toggleTheme}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] text-white w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
