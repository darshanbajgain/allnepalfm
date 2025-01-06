import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeStore } from "@/store/themeStore";
import { AppSidebar } from "@/layouts/Sidebar";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Player from "@/components/Player";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.slice(1);
    return path === "" ? "all-stations" : path;
  });

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

  useEffect(() => {
    const path = location.pathname.slice(1);
    setActiveTab(path === "" ? "all-stations" : path);
  }, [location]);

  const handleTabChange = (tabId, path) => {
    if (tabId === "all-stations" || tabId === "about") {
      setActiveTab(tabId);
      navigate(path);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full">
          {!isMobile && (
            <div className="w-64 flex-shrink-0">
              <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-screen">
              <Header isMobile={isMobile} activeTab={activeTab} />
              <main className="flex-1 overflow-auto xl:overflow-hidden">
                <div className="h-full w-full max-w-[1400px] mx-auto px-6">
                  {children}
                </div>
              </main>
              {isMobile && (
                <MobileNavigation
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              )}
              <div>
                <Player />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
