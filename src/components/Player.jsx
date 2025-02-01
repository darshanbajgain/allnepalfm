import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { X, Minimize2 } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CustomAudioPlayer } from "./CustomAudioPlayer";

export default function Player() {
  const {
    stations,
    currentStationIndex,
    setIsPlaying,
    nextStation,
    previousStation,
    showPlayer,
    setShowPlayer,
  } = usePlayerStore();

  const [isMinimized, setIsMinimized] = useState(false);
  const currentStation = stations[currentStationIndex];
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

  useEffect(() => {
    // Clear error when changing stations
    setError(null);
  }, [currentStation]); // Updated dependency

  if (!showPlayer || !currentStation) return null;

  return (
    <>
      <div className={isMinimized ? "hidden" : "block"}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-4">
          <div className="w-full max-w-2xl animate-in slide-in-from-bottom duration-300">
            <Card className="bg-[#0A0B1E] border-t border-white/10 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 rounded-sm">
                      <AvatarImage
                        src={currentStation.img}
                        alt={currentStation.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-2xl bg-primary/20 text-primary">
                        {currentStation.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        {currentStation.name}
                      </h3>
                      <p className="text-sm text-white/60">
                        {currentStation.frequency || "98.1 MHz"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleMinimize}
                      className="text-white hover:bg-white"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPlayer(false)}
                      className="text-white hover:bg-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="mb-4 bg-red-900/50 border-red-500 text-white"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <CustomAudioPlayer
                  src={currentStation.url}
                  onPlay={() => {
                    setIsPlaying(true);
                    setError(null);
                  }}
                  onPause={() => setIsPlaying(false)}
                  onNext={nextStation}
                  onPrevious={previousStation}
                  onError={handleError}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isMinimized && (
        <div className="fixed bottom-4 right-4 z-50 p-3 bg-[#0A0B1E] shadow-lg rounded-lg flex items-center gap-4">
          {error && (
            <Alert
              variant="destructive"
              className="absolute right-0 bg-red-900/50 border-red-500 text-white bottom-full mb-2 w-[300px]"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <button
            onClick={handleMaximize}
            className="flex items-center gap-3 text-white"
          >
            <Avatar className="h-10 w-10 rounded-sm">
              <AvatarImage
                src={currentStation.img}
                alt={currentStation.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-sm bg-primary/20 text-primary">
                {currentStation.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{currentStation.name}</span>
              <span className="text-xs text-white/60">
                {currentStation.frequency || "98.1 MHz"}
              </span>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
