import { useRef } from "react";
import SearchBar from "@/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import StationList from "@/components/StationList";
import useSearchStore from "@/store/searchStore";
import Layout from "@/layouts/Layout";
import CategoriesSection from "@/components/CategoreisSection";

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
  const stationListRef = useRef(null);
  const { selectedProvince, setSelectedProvince } = useSearchStore();
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
          <div className="mb-6 max-w-screen-sm flex flex-col sm:flex-row gap-4">
            <SearchBar />
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
          <div className="mt-4">
            <StationList />
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
