import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Play } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import useSearchStore from "@/store/searchStore";
import axios from "@/mockApi";
import Loader from "./Loader";

export default function StationList() {
  const { searchTerm, selectedProvince } = useSearchStore();
  const { setStations, setCurrentStation, stations } = usePlayerStore();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/stations"); // Mocked GET request
        setStations(response.data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const filteredStations = stations?.filter(
    (station) =>
      (selectedProvince === "All" || station.province === selectedProvince) &&
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-32">
        <Loader className="text-primary h-12 w-12 border-4" />
      </div>
    );
  if (filteredStations.length === 0) return <p>No stations found.</p>;

  return (
    <div
      className={`grid gap-4 m-2 mb-6 ${
        isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"
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
              className={`text-muted-foreground ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              {station.province}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
