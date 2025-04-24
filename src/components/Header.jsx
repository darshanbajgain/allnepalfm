import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themeStore";
import PropTypes from "prop-types";

export default function Header({ isMobile }) {
  const { theme, toggleTheme } = useThemeStore();

  // Theme is now handled in the Layout component
  return (
    <div className="flex justify-end items-center gap-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="relative h-9 w-9 rounded-md bg-card border-border/30 hover:bg-primary/10"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] text-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] text-foreground w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}

Header.propTypes = {
  isMobile: PropTypes.bool,
};
