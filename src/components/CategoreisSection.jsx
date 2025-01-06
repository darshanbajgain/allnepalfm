import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function CategoriesSection({
  selectedProvince,
  setSelectedProvince,
}) {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

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

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index) => emblaApi && emblaApi.scrollTo(index);

  if (loading) return <p>Loading provinces...</p>;

  return (
    <div className="mb-6">
      <h2 className="text-3xl text-center font-bold mb-6 mx-2">
        Listen by Provinces
      </h2>
      <div className="relative max-w-5xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {provinces?.map((province, index) => (
              <div
                key={province.name}
                className="flex-[0_0_80%] min-w-0 md:flex-[0_0_70%] relative m-4 p-4"
                style={{
                  opacity: selectedIndex === index ? 1 : 0.4,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <Card
                  className={`cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-[0.98] bg-card hover:bg-muted ${
                    selectedProvince === province.name
                      ? "ring-2 ring-primary"
                      : "hover:ring-1 hover:ring-border"
                  }`}
                  onClick={() => setSelectedProvince(province.name)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
                    <img
                      src={
                        province?.image ||
                        "/placeholder.svg?height=300&width=400"
                      }
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
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={scrollNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="flex justify-center gap-2 mt-4">
          {provinces?.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                selectedIndex === index
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/30"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
