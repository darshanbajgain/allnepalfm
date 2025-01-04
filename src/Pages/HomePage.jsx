import { useState, useRef } from "react";
import Layout from "@/Layouts/Layout";
import SearchBar from "@/components/SearchBar";
import StationList from "@/components/StationList";
import { CategoriesSection } from "@/components/categories";

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
  const stationListRef = useRef(null);

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    if (stationListRef.current) {
      stationListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Layout>
      <div
        ref={stationListRef}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 min-h-[calc(100vh-theme(spacing.16))]"
      >
        <div className="order-1 lg:order-2">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            provinces={provinces}
            selectedProvince={selectedProvince}
            handleProvinceSelect={handleProvinceSelect}
          />
          <div className="mt-4">
            <StationList
              selectedProvince={selectedProvince}
              searchTerm={searchTerm}
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
    </Layout>
  );
}
