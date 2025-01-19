import { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import useStationsStore from "@/store/stationsStore";

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
  const [isMobile, setIsMobile] = useState(false);
  const { selectedFilter, setSelectedFilter } = useStationsStore();

  const filters = [
    { id: "all", label: "All Fm" },
    { id: "popular", label: "Popular Fm" },
    { id: "music", label: "Music" },
    { id: "news", label: "News" },
    { id: "community", label: "Community" },
  ]

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    if (stationListRef.current && !isMobile) {
      stationListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (stationListRef.current && isMobile) {
      stationListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);


  return (
    <Layout>
      <div className="w-full flex flex-col mt-4 items-start">
        <div className="flex flex-wrap gap-2 justify-center mb-8 p-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                "border border-gray-200 hover:bg-gray-100",
                selectedFilter === filter.id
                  ? "bg-gray-900 text-white hover:bg-gray-800 border-transparent"
                  : "bg-white text-gray-700"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div
          ref={stationListRef}
          className="w-full flex flex-col gap-8 py-6 h-full"
        >

          <div className="w-full px-8 max-w-sm md:max-w-xl lg:max-w-7xl mx-auto">
            <CategoriesSection
              selectedProvince={selectedProvince}
              setSelectedProvince={handleProvinceSelect}
            />
          </div>
          <div className="w-full p-4">
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
        </div>
      </div>

    </Layout>
  );
}
