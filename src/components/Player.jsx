import { useState } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Player() {
  const {
    stations,
    currentStationIndex,
    isPlaying,
    setIsPlaying,
    nextStation,
    previousStation,
    showPlayer,
    setShowPlayer,
  } = usePlayerStore();

  const [isMinimized, setIsMinimized] = useState(false);
  const currentStation = stations[currentStationIndex];
  const [playerInstance, setPlayerInstance] = useState(null);
  const [error, setError] = useState(null);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const handleError = (e) => {
    console.error("Audio Error:", e);
    setError(
      `Can't play ${currentStation.name}. The stream might be offline or unavailable.`
    );
  };

  if (!showPlayer || !currentStation) return null;

  return (
    <>
      {/* Always render the audio player but conditionally show different UIs */}
      <div className={isMinimized ? "hidden" : "block"}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-4">
          <div className="w-full max-w-3xl animate-in slide-in-from-bottom duration-300">
            {error && (
              <Alert variant="destructive" className="mb-4 bg-background">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card className="bg-border border-t border-border/20 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarImage
                        src={currentStation.imageUrl}
                        alt={currentStation.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg bg-border/30 text-white">
                        {currentStation.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-base font-medium text-white">
                        {currentStation.name}
                      </h3>
                      <p className="text-sm text-white">
                        {currentStation.frequency || "98.1 MHz"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleMinimize}
                      className="text-white  hover:bg-card-foreground/10"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPlayer(false)}
                      className="text-white hover:text-white hover:bg-card-foreground/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <AudioPlayer
                  ref={(player) => {
                    if (player && !playerInstance) {
                      setPlayerInstance(player);
                    }
                  }}
                  autoPlay
                  src={currentStation.url}
                  showSkipControls
                  showJumpControls={false}
                  onPlay={() => {
                    setIsPlaying(true);
                    setError(null);
                  }}
                  onPause={() => setIsPlaying(false)}
                  onClickPrevious={previousStation}
                  onClickNext={nextStation}
                  onError={handleError}
                  customStyles={{
                    // Volume control styles
                    volume: {
                      background: "#fff", // White background for volume track
                    },
                    volumeSlider: {
                      background: "#d3d3d3", // Light gray progress bar color
                    },
                    volumeThumb: {
                      background: "#2980b9", // Thumb color (the draggable part)
                    },
                    // Progress bar styles
                    progressBar: {
                      background: "#d3d3d3", // Light gray background for the progress bar
                    },
                    progress: {
                      background: "#fff", // White bar that fills up based on percentage
                    },
                  }}
                  className="player-override"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Minimized player */}
      {isMinimized && (
        <div className="fixed bottom-4 right-2 z-50 p-2 bg-background shadow-lg rounded-lg flex items-center gap-3">
          {error && (
            <Alert
              variant="destructive"
              className="absolute right-2 bg-background bottom-full mb-2 w-[300px]"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleMaximize} className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={currentStation.imageUrl}
                alt={currentStation.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg bg-card-foreground/10 text-primary-foreground">
                {currentStation.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-primary-foreground text-sm font-medium">
              {currentStation.name}
            </div>
          </Button>
        </div>
      )}
    </>
  );
}
