import { useEffect, useRef, useState } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  AlertCircle,
  X,
  CircleAlert,
} from "lucide-react";
import { Slider } from "@components/ui/slider";
import { usePlayerStore } from "@/store/playerStore";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

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
  const [playbackError, setPlaybackError] = useState(null); // Track playback errors
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    if (currentStation) {
      setPlaybackError(null);
      setIsErrorVisible(false);
      audioRef.current.src = currentStation.url;

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
          setPlaybackError(
            "Unable to play this station. It might be temporarily offline."
          );
          setIsErrorVisible(true);
        });
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

  const handleAudioError = () => {
    console.error("Audio playback error");
    setIsErrorVisible(true);
    setIsPlaying(false);
  };

  const dismissError = () => {
    setIsErrorVisible(false);
  };

  return (
    <>
      {isErrorVisible && playbackError && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50 animate-in fade-in slide-in-from-bottom-4">
          <Alert
            variant="destructive"
            className="relative bg-background border-destructive/50 text-destructive"
          >
            <CircleAlert className="h-4 w-4" />
            <AlertTitle className="font-semibold">Playback Error</AlertTitle>
            <AlertDescription className="text-sm">
              {playbackError}
            </AlertDescription>
            <Button
              className="bg-transparent absolute top-2 right-2 h-6 w-6 hover:bg-transparent"
              onClick={dismissError}
            >
              <X className="h-2 w-2 text-red-500" />
            </Button>
          </Alert>
        </div>
      )}
      <Card className="bottom-0 right-0 max-w-full bg-card border-t border-border">
        <CardContent className="flex items-center justify-between py-2 px-4">
          {currentStation ? (
            <div className="flex-1 justify-center mr-4">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {currentStation.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {currentStation.province}
              </p>
            </div>
          ) : (
            <div className="flex-1 justify-center mr-4">
              <p className="text-xs text-muted-foreground truncate">
                Click at the play icon in the station cards to listen FM online
              </p>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={previousStation}
              disabled={!currentStation} // Disable if currentStation is present
            >
              <SkipBack className="h-4 w-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!currentStation} // Disable if currentStation is present
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!currentStation} // Disable if currentStation is present
              onClick={nextStation}
            >
              <SkipForward className="h-4 w-4 text-white" />
            </Button>
          </div>
          {currentStation && (
            <div className="flex items-center space-x-2 ml-4">
              <Volume2
                disabled={!currentStation} // Disable if currentStation is present
                className="h-4 w-4 text-white"
              />
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          )}
          <audio ref={audioRef} onError={handleAudioError} />
        </CardContent>
      </Card>
    </>
  );
}
