import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Loader2,
  Radio,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

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
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [bufferingProgress, setBufferingProgress] = useState(0);

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
        setBufferingProgress(100); // Fully buffered when playing
        onPlay();
      };
      const handlePause = () => {
        setIsPlaying(false);
        onPause();
      };
      const handleWaiting = () => {
        setIsBuffering(true);
        // Start with a small progress to indicate something is happening
        setBufferingProgress(10);
      };
      const handleCanPlay = () => {
        setIsBuffering(false);
        setBufferingProgress(100);
      };
      const handleError = (e) => {
        setIsBuffering(false);
        setBufferingProgress(0);
        onError(e);
      };
      const handleProgress = () => {
        // Update buffering progress based on buffered ranges
        if (audio.buffered.length > 0) {
          const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
          const duration = audio.duration;
          if (duration > 0) {
            const progress = Math.round((bufferedEnd / duration) * 100);
            setBufferingProgress(progress);
          }
        }
      };

      audio.addEventListener("playing", handlePlaying);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("waiting", handleWaiting);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("progress", handleProgress);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("playing", handlePlaying);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("progress", handleProgress);
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
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <audio ref={audioRef} src={src} autoPlay />

      {/* Buffering progress indicator */}
      {isBuffering && (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Buffering stream...</span>
            </div>
            <span className="text-xs font-medium">{bufferingProgress}%</span>
          </div>
          <Progress value={bufferingProgress} className="h-1" />
        </div>
      )}

      {/* Main controls */}
      <div className="audio-controls">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="text-muted-foreground hover:text-white hover:bg-muted/20 transition-colors"
        >
          <SkipBack className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="play-button"
          disabled={isBuffering}
        >
          {isBuffering ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="text-muted-foreground hover:text-white hover:bg-muted/20 transition-colors"
        >
          <SkipForward className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Volume controls */}
      <div className="flex items-center gap-2 px-2 sm:px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-muted-foreground hover:text-white hover:bg-muted/20 h-8 w-8 p-0"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>
        <Slider
          defaultValue={[0.8]}
          max={1}
          step={0.01}
          value={[volume]}
          onValueChange={handleVolumeChange}
          className="w-24 sm:w-32"
        />
      </div>
    </div>
  );
}

CustomAudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
