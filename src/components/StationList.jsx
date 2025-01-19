import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import useSearchStore from "@/store/searchStore";
import axios from "@/mockApi";
import Loader from "./Loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import useStationsStore from "@/store/stationsStore";

export default function StationList() {
  const { searchTerm, selectedProvince } = useSearchStore();
  const { setStations, setCurrentStation, stations } = usePlayerStore();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedFilter } = useStationsStore();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/stations"); // Mocked GET request
        setStations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [setStations]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);


  const filteredStations = stations?.filter((station) => {
    const matchesProvince = selectedProvince === "All" || station.province === selectedProvince;
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || station.categories.includes(selectedFilter);

    return matchesProvince && matchesSearch && matchesFilter;
  });


  if (loading)
    return (
      <div className="flex items-center justify-center h-32">
        <Loader className="text-primary h-12 w-12 border-4" />
      </div>
    );

  if (filteredStations.length === 0) return <p>No stations found.</p>;

  return (
    <ScrollArea className="h-[calc(100vh-225px)] rounded-2xl border-2">
      <div
        className={`grid gap-4 p-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-1 lg:grid-cols-2"
          }`}
      >
        {filteredStations.map((station) => (
          <Card
            key={station.id}
            className="bg-transparent text-card-foreground cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-95"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}
              >
                {station.name}
              </CardTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setCurrentStation(station)}
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play {station.name}</span>
              </Button>
            </CardHeader>
            <CardContent>
              <p
                className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"
                  }`}
              >
                {station.province}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
