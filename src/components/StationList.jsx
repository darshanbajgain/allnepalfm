import { useState, useEffect, useMemo, useCallback } from "react";
import { usePlayerStore } from "@/store/playerStore";
import useSearchStore from "@/store/searchStore";
import axios from "@/mockApi";
import Loader from "./Loader";
import useStationsStore from "@/store/stationsStore";
import StationCard from "./StationCard";

export default function StationList() {
  // Fetch store values
  const { searchTerm, selectedProvince } = useSearchStore();
  const { setStations, setCurrentStation, stations, setShowPlayer } =
    usePlayerStore();
  const { selectedFilter } = useStationsStore();

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch stations from API on mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/stations");
        setStations(response.data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [setStations]); // Runs only when `setStations` changes

  // Detect if user is on a mobile screen
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  /** Memoize the filtered stations list to avoid recalculating on every render */
  const filteredStations = useMemo(() => {
    return stations?.filter((station) => {
      const matchesProvince =
        selectedProvince === "All" || station.province === selectedProvince;
      const matchesSearch = station.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        selectedFilter === "all" || station.categories.includes(selectedFilter);

      return matchesProvince && matchesSearch && matchesFilter;
    });
  }, [stations, selectedProvince, searchTerm, selectedFilter]);

  /** Memoize the play button click handler to prevent re-creating on every render */
  const handlePlayClick = useCallback(
    (station) => {
      setCurrentStation(station);
      setShowPlayer(true);
    },
    [setCurrentStation, setShowPlayer]
  );

  // Show loading state
  if (loading)
    return (
      <div className="flex items-center justify-center h-32">
        <Loader className="text-primary h-12 w-12 border-4" />
      </div>
    );

  // Show empty state if no stations found
  if (filteredStations.length === 0)
    return (
      <p className="text-center text-muted-foreground">No stations found.</p>
    );

  return (
    <div className="grid grid-cols-2 mb-8 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
      {filteredStations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onPlay={handlePlayClick}
        />
      ))}
    </div>
  );
}
