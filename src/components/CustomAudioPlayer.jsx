import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/store/playerStore";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function CustomAudioPlayer({
  src,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onError,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlaying = () => {
        setIsPlaying(true);
        setIsBuffering(false);
        onPlay();
      };
      const handlePause = () => {
        setIsPlaying(false);
        onPause();
      };
      const handleWaiting = () => {
        setIsBuffering(true);
      };
      const handleCanPlay = () => {
        setIsBuffering(false);
      };
      const handleError = (e) => {
        setIsBuffering(false);
        onError(e);
      };

      audio.addEventListener("playing", handlePlaying);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("waiting", handleWaiting);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("playing", handlePlaying);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("error", handleError);
      };
    }
  }, [onPlay, onPause, onError]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(onError);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      setIsMuted(!isMuted);
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <audio ref={audioRef} src={src} autoPlay />

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="text-white hover:bg-white transition-colors"
        >
          <SkipBack className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-12 w-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-white transition-colors"
          disabled={isBuffering}
        >
          {isBuffering ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="text-white hover:bg-white transition-colors"
        >
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex items-center gap-2 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-white hover:bg-white"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
        <Slider
          defaultValue={[1]}
          max={1}
          step={0.01}
          value={[volume]}
          onValueChange={handleVolumeChange}
          className="w-28"
        />
      </div>
    </div>
  );
}
