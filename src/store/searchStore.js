import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  selectedProvince: "All",
  setSelectedProvince: (selectedProvince) => set({ selectedProvince }),
}));

export default useSearchStore;
