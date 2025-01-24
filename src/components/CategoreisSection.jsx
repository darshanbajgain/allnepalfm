import { Card, CardContent, CardHeader } from "@/components/ui/card";

import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

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
        const response = await axios.get("/provinces");
        setProvinces(response.data);

      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);




  return (
    <div className="mb-6">
      {loading ? (
        <div className="flex items-center justify-center h-[250px] w-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="">

            {provinces.map((province, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <div className="group relative">

                    <Card
                      className={cn(
                        "overflow-hidden rounded-xl cursor-pointer transition-all duration-300",
                        "hover:shadow-lg relative bg-background",
                        "group-hover:translate-y-[-2px]",
                        selectedProvince === province.name && "ring-2 ring-primary opacity-100"

                      )}
                      onClick={() => setSelectedProvince(province.name)}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <img
                            src={province.image || "/placeholder.svg"}
                            alt={`${province.name} landscape`}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm xl:text-lg font-semibold mb-2">{province.name}</h3>
                          <p className="text-xs xl:text-sm text-muted-foreground">
                            {province.stationCount} FM Stations
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CarouselItem>
            ))
            }
          </CarouselContent>
          <CarouselPrevious className="flex text-white -left-4 sm:-left-4" />
          <CarouselNext className="flex text-white -right-4 sm:-right-4" />
        </Carousel>
      )}
    </div>


  );
}
