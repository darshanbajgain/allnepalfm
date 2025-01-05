import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchTerm: "",
  setSearchTerm: (terms) => set({ terms }),

  selectedProvince: "All",
  setSelectedProvince: (selectedProvince) => set({ selectedProvince }),
}));

export default useSearchStore;
