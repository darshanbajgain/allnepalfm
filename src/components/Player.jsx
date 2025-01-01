import { useEffect, useRef } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@components/ui/slider";
import { usePlayerStore } from "@/store/playerStore";

export default function Player() {
  const {
    stations,
    currentStationIndex,
    isPlaying,
    volume,
    setIsPlaying,
    setVolume,
    nextStation,
    previousStation,
  } = usePlayerStore();
  const audioRef = useRef(null);

  const currentStation = stations[currentStationIndex];

  useEffect(() => {
    if (currentStation) {
      audioRef.current.src = currentStation.url;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.error("Playback failed", error));
      }
    }
  }, [currentStation, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback failed", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
  };

  if (!currentStation) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <CardContent className="flex items-center justify-between py-2 px-4">
        <div className="flex-1 mr-4">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {currentStation.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {currentStation.province}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={previousStation}>
            <SkipBack className="h-4 w-4 text-white" />
          </Button>
          <Button variant="outline" size="icon" onClick={togglePlayPause}>
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={nextStation}>
            <SkipForward className="h-4 w-4 text-white" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Volume2 className="h-4 w-4 text-white" />
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={[volume]}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
        <audio ref={audioRef} />
      </CardContent>
    </Card>
  );
}
