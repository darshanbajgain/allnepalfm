import { useState, useRef } from "react";
import Layout from "@/Layouts/Layout";
import StationList from "@components/StationList";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { CategoriesSection } from "@/components/categories";
import { NoStationsMessage } from "@/components/NoStations";

const provinces = [
  "All",
  "Koshi Province",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-stations");
  // Ref for the Station List
  const stationListRef = useRef(null);

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);

    // Scroll to the Station List
    if (stationListRef.current) {
      stationListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "all-stations":
        return (
          <div
            ref={stationListRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6"
          >
            <div className="order-2 lg:order-1">
              <div className="mb-6 max-w-screen-sm flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Search FM stations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Select
                  value={selectedProvince}
                  onValueChange={handleProvinceSelect}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <StationList
                  selectedProvince={selectedProvince}
                  searchTerm={searchTerm}
                  renderNoStations={() => (
                    <NoStationsMessage province={selectedProvince} />
                  )}
                />
              </div>
            </div>
              <div className="order-1 lg:order-2">
                <CategoriesSection
                  selectedProvince={selectedProvince}
                  setSelectedProvince={handleProvinceSelect}
                />
              </div>
          </div>
        );
      case "favorites":
        return (
          <div className="text-center text-muted-foreground">
            Favorites feature coming soon!
          </div>
        );
      case "settings":
        return (
          <div className="text-center text-muted-foreground">
            Settings feature coming soon!
          </div>
        );
      case "about":
        return (
          <div className="text-center text-muted-foreground">
            About this app feature coming soon!
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
