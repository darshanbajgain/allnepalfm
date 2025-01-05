import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoriesSection({
  selectedProvince,
  setSelectedProvince,
}) {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/provinces"); // Fetch provinces
        setProvinces(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  if (loading) return <p>Loading provinces...</p>;

  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold mb-6 mx-2">Listen by Provinces</h2>
      <div className=" sticky top-4 grid grid-cols-1 sm:grid-cols-2 gap-4 m-2 mb-6">
        {provinces?.map((province, index) => (
          <Card
            key={province.name}
            className={`cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-[0.98] bg-card hover:bg-muted ${
              selectedProvince === province.name
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-border"
            }`}
            onClick={() => setSelectedProvince(province.name)}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
              <img
                src={province?.image || "/placeholder.svg?height=300&width=400"}
                alt={`Scenery of ${province?.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-card-foreground">
                  {province.name || "N/A"}
                </h3>
                <p className="text-xs text-muted-foreground px-2 py-1 rounded-full">
                  {province?.stationCount} FM Stations
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
