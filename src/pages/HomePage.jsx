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
import Player from "@/components/Player";
import Header from "@/components/Header";

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
    { id: "all", label: "All" },
    { id: "popular", label: "Popular" },
    // { id: "music", label: "Music" },
    { id: "news", label: "News" },
    // { id: "community", label: "Community" },
  ];

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    // if (stationListRef.current && !isMobile) {
    //   stationListRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // } else if (stationListRef.current && isMobile) {
    //   stationListRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end",
    //   });
    // }
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
      <div className="w-full relative flex flex-col mt-4 items-start p-4">
        <div className="w-full flex flex-row justify-between gap-4 mb-8">
          <div className="flex flex-row gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-normal transition-all duration-200",
                  "border border-border tracking-widest",
                  selectedFilter === filter.id
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-background text-foreground hover:bg-primary/10"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={stationListRef}
          className="w-full flex flex-col gap-2 py-6 h-full"
        >
          <h1 className="text-sm xl:text-lg font-semibold mb-2">
            Listen by Province:
          </h1>
          {selectedFilter === "all" && (
            <div className="w-full min-h-52 max-w-sm md:max-w-xl lg:max-w-7xl mx-auto">
              <CategoriesSection
                selectedProvince={selectedProvince}
                setSelectedProvince={handleProvinceSelect}
              />
            </div>
          )}
          <div className="w-full mt-2">
            <div className="mb-6 max-w-screen-sm flex flex-col sm:flex-row gap-4">
              <SearchBar />
              <Select
                value={selectedProvince}
                onValueChange={handleProvinceSelect}
                className="text-xs xl:text-sm ring-border focus:outline-border focus:ring-border"
              >
                <SelectTrigger className="w-full h-8 sm:h-10 sm:w-[200px] text-xs xl:text-sm">
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

      <div className="w-full max-w-5xl mx-auto pb-4 z-50">
        <Player />
      </div>
    </Layout>
  );
}
