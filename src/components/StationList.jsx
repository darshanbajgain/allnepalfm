import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Play } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";

const dummyStations = [
  {
    id: 1,
    name: "Radio Nepal",
    province: "Bagmati Province",
    url: "http://radionepal.gov.np/live/",
  },
  {
    id: 2,
    name: "Kantipur FM",
    province: "Bagmati Province",
    url: "https://radio-broadcast.ekantipur.com/stream",
  },
  {
    id: 3,
    name: "Radio Annapurna",
    province: "Gandaki Province",
    url: "http://streaming.softnep.net:8091/;stream.nsv&type=mp3",
  },
  {
    id: 4,
    name: "Ujyaalo 90 Network",
    province: "Bagmati Province",
    url: "http://stream.zeno.fm/h527zqpgxchvv",
  },
  {
    id: 5,
    name: "Radio Sarangi",
    province: "Koshi Province",
    url: "http://streaming.softnep.net:8037/;stream.nsv&type=mp3",
  },
  {
    id: 6,
    name: "Radio Lumbini",
    province: "Lumbini Province",
    url: "http://streaming.softnep.net:8065/;stream.nsv&type=mp3",
  },
];

export default function StationList({ selectedProvince, searchTerm }) {
  const { setStations, setCurrentStation } = usePlayerStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setStations(dummyStations);
  }, [setStations]);

  const filteredStations = dummyStations.filter(
    (station) =>
      (selectedProvince === "All" || station.province === selectedProvince) &&
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
