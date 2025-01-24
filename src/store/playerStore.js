import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  stations: [],
  currentStationIndex: -1,
  isPlaying: false,
  volume: 1,
  showPlayer: false,
  setStations: (stations) => set({ stations }),
  setCurrentStation: (station) => {
    const index = get().stations.findIndex((s) => s.id === station.id);
    set({ currentStationIndex: index, isPlaying: true });
  },
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  nextStation: () => {
    const { stations, currentStationIndex } = get();
    if (stations.length > 0) {
      const nextIndex = (currentStationIndex + 1) % stations.length;
      set({ currentStationIndex: nextIndex, isPlaying: true });
    }
  },
  previousStation: () => {
    const { stations, currentStationIndex } = get();
    if (stations.length > 0) {
      const previousIndex = (currentStationIndex - 1 + stations.length) % stations.length;
      set({ currentStationIndex: previousIndex, isPlaying: true });
    }
  },
  setShowPlayer: (show) => set({ showPlayer: show }),
}));
