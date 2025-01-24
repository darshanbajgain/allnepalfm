import { MoonIcon, SunIcon, Menu } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@components/ui/button";
import { useThemeStore } from "@/store/themeStore";

export default function Header({ isMobile }) {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);


  return (
    <div className="flex justify-end items-center gap-4">
      <div className="flex items-center">
        <Button variant="outline" size="round" onClick={toggleTheme}>
          <SunIcon className="h-[1.2rem] w-[1.2rem] text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] text-white w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}
