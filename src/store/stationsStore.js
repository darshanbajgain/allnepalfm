import { create } from 'zustand';

const useStationsStore = create((set) => ({
  stations: [],
  selectedFilter: 'all',
  setStations: (stations) => set({ stations }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
}));

export default useStationsStore;
