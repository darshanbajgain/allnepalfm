import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play } from "lucide-react";
import PropTypes from "prop-types";

export default function StationCard({ station, onPlay }) {
  return (
    <Card className="station-card group overflow-hidden flex flex-col h-full">
      <div className="relative flex flex-col items-center p-3 sm:p-4 gap-2 justify-start">
        <div className="flex items-center justify-between w-full gap-2">
          <Avatar className="h-10 w-10 lg:h-12 lg:w-12 rounded-md">
            <AvatarImage
              src={station.img}
              alt={station.name}
              className="object-cover"
            />
            <AvatarFallback className="text-xs lg:text-sm font-medium bg-border/80 rounded-sm text-white">
              {station.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-xs lg:text-sm leading-tight truncate flex-1">
            {station.name}
          </h3>
        </div>
      </div>
      <CardContent className="p-3 sm:p-4 border-t border-border/30 flex flex-col justify-between gap-2 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm font-semibold text-muted-foreground">
            {station.frequency || "N/A"}
          </span>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full text-white hover:text-primary-foreground hover:bg-border/50 bg-border"
            onClick={() => onPlay(station)}
            aria-label={`Play ${station.name}`}
          >
            <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {station.province}
        </p>
      </CardContent>
    </Card>
  );
}

StationCard.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    frequency: PropTypes.string,
    province: PropTypes.string,
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
};
