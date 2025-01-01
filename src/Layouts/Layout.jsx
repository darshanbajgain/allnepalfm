import React, { useState, useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import Player from "@/components/Player";
import MobileNavigation from "@/components/MobileNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children, activeTab, setActiveTab }) {
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {!isMobile && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isMobile={isMobile} activeTab={activeTab} />
        <main
          className={`flex-1 overflow-hidden  bg-background ${
            !isMobile ? "ml-64" : ""
          }`}
        >
          <div className="container mx-auto px-4 py-8">
            {React.cloneElement(children)}
          </div>
        </main>
        <Player />
        {isMobile && (
          <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}
