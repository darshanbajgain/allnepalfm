import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeStore } from "@/store/themeStore";
import { AppSidebar } from "@/layouts/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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
      setIsMobile(window.innerWidth < 1024);
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
    <div className="flex h-screen">
      <SidebarProvider>
        <div className="flex w-full">
          {!isMobile && (
            <div className="hidden lg:block w-64 flex-shrink-0 bg-sidebar">
              <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          )}
          <SidebarInset className="flex-1 min-w-0 bg-background">
            <div className="flex flex-col h-full">
              <main className="flex-1 overflow-auto h-screen xl:overflow-hidden">
                <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-4 xl:px-6 mb-8">
                  {children}
                </div>
              </main>
              {isMobile && (
                <MobileNavigation
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}