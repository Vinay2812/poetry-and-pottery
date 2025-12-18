import { create } from "zustand";

interface FilterState {
  // Product filters
  category: string;
  materials: string[];
  sortBy: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  search: string;

  // Actions
  setCategory: (category: string) => void;
  toggleMaterial: (material: string) => void;
  setMaterials: (materials: string[]) => void;
  setSortBy: (sortBy: string) => void;
  setPriceRange: (min: number | undefined, max: number | undefined) => void;
  setSearch: (search: string) => void;
  clearFilters: () => void;
}

const initialState = {
  category: "all",
  materials: [] as string[],
  sortBy: "featured",
  minPrice: undefined as number | undefined,
  maxPrice: undefined as number | undefined,
  search: "",
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setCategory: (category) => set({ category }),

  toggleMaterial: (material) =>
    set((state) => ({
      materials: state.materials.includes(material)
        ? state.materials.filter((m) => m !== material)
        : [...state.materials, material],
    })),

  setMaterials: (materials) => set({ materials }),

  setSortBy: (sortBy) => set({ sortBy }),

  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),

  setSearch: (search) => set({ search }),

  clearFilters: () => set(initialState),
}));
