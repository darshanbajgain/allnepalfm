import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Minimize2, GripVertical, Radio, AlertCircle } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CustomAudioPlayer } from "./CustomAudioPlayer";
import Draggable from "react-draggable";

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
  const [error, setError] = useState(null);
  const currentStation = stations[currentStationIndex];
  const [isDragging, setIsDragging] = useState(false);

  // Load position from localStorage
  const getSavedPosition = () => {
    if (typeof window !== "undefined") {
      // Check if we're on mobile (smaller screen)
      const isMobileView = window.innerWidth < 768;

      const savedPos = localStorage.getItem("playerPosition");
      if (savedPos) {
        const pos = JSON.parse(savedPos);
        // Make sure the position is valid for the current screen size
        return {
          x: Math.min(pos.x, window.innerWidth - 200),
          y: Math.min(pos.y, window.innerHeight - 150)
        };
      } else {
        // Default position - top right on mobile, bottom left on desktop
        return isMobileView
          ? { x: window.innerWidth - 220, y: 20 } // Top right on mobile
          : { x: 20, y: window.innerHeight - 150 }; // Bottom left on desktop
      }
    }
    return { x: 20, y: 20 }; // Fallback
  };

  const [position, setPosition] = useState(getSavedPosition());

  useEffect(() => {
    setError(null); // Clear error when station changes
  }, [currentStation]);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    if (!isDragging) {
      setIsMinimized(false);
    }
  };

  // Add touch event handler for mobile view
  const handleTouchMaximize = () => {
    if (!isDragging) {
      setIsMinimized(false);
    }
  };

  const handleError = (e) => {
    console.error("Audio Error:", e);
    setError(
      `Can't play ${currentStation.name}. The stream might be offline or unavailable.`
    );
  };

  // Save position on drag stop
  const handleDragStart = () => setIsDragging(true);
  const handleDragStop = (_, data) => {
    setIsDragging(false);
    setPosition({ x: data.x, y: data.y });
    localStorage.setItem(
      "playerPosition",
      JSON.stringify({ x: data.x, y: data.y })
    );
  };

  // Add effect to handle window resize and keep player in view
  useEffect(() => {
    const handleResize = () => {
      // If the player is minimized, make sure it stays in view
      if (isMinimized) {
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 150;

        // If the current position is outside the viewport, adjust it
        if (position.x > maxX || position.y > maxY) {
          const newPosition = {
            x: Math.min(position.x, maxX),
            y: Math.min(position.y, maxY)
          };
          setPosition(newPosition);
          localStorage.setItem("playerPosition", JSON.stringify(newPosition));
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMinimized, position]);

  if (!showPlayer || !currentStation) return null;

  return (
    <>
      <div className={isMinimized ? "hidden" : "block"}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-4">
          <div className="w-full max-w-2xl animate-in slide-in-from-bottom duration-300">
            <Card className="bg-card border border-border/30 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 rounded-md">
                      <AvatarImage
                        src={currentStation.img}
                        alt={currentStation.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md bg-primary/20 text-primary">
                        {currentStation.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-foreground mb-0.5 sm:mb-1">
                        {currentStation.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Radio className="h-3 w-3 text-primary" />
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {currentStation.frequency || "98.1 MHz"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleMinimize}
                      onTouchStart={handleTouchMaximize}
                      className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPlayer(false)}
                      className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="mb-4 bg-destructive/20 border-destructive/50 text-foreground"
                  >
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-sm">{error}</AlertDescription>
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

      {/* Draggable Minimized Player */}
      {isMinimized && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Draggable
            bounds={{top: 0, left: 0, right: window.innerWidth - 200, bottom: window.innerHeight - 150}}
            position={position}
            onStart={handleDragStart}
            onStop={handleDragStop}
          >
            <div className="absolute p-2 sm:p-3 bg-card border-2 border-primary/30 shadow-xl rounded-lg flex items-center gap-2 sm:gap-3 cursor-move pointer-events-auto z-50 mb-20 sm:mb-0">
              {error && (
                <Alert
                  variant="destructive"
                  className="absolute right-0 bg-destructive/20 border-destructive/50 text-foreground bottom-full mb-2 w-[250px] sm:w-[300px]"
                >
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-xs">{error}</AlertDescription>
                </Alert>
              )}

              {/* Drag Handle */}
              <div
                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                title="Drag"
              >
                <GripVertical className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <button
                onClick={handleMaximize}
                onTouchStart={handleMaximize}
                className="flex items-center gap-2 sm:gap-3 text-foreground"
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 rounded-md">
                  <AvatarImage
                    src={currentStation.img}
                    alt={currentStation.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-md bg-primary/20 text-primary">
                    {currentStation.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-medium">
                    {currentStation.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Radio className="h-2 w-2 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {currentStation.frequency || "98.1 MHz"}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </Draggable>
        </div>
      )}
    </>
  );
}
