import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeStore } from "@/store/themeStore";
import { AppSidebar } from "@/layouts/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import PropTypes from "prop-types";

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

  // Apply theme on initial load and when it changes
  useEffect(() => {
    // Remove both classes first to ensure clean state
    document.documentElement.classList.remove("light", "dark");
    // Add the current theme class
    document.documentElement.classList.add(theme);
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
            <div className="hidden lg:block w-64 flex-shrink-0 bg-sidebar border-r border-border/30">
              <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          )}
          <SidebarInset className="flex-1 min-w-0 bg-background">
            <div className="flex flex-col h-full">
              <main className="flex-1 overflow-auto h-screen pb-16 lg:pb-0 xl:overflow-hidden">
                <div className="h-full w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 xl:px-8 py-4 sm:py-6">
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};