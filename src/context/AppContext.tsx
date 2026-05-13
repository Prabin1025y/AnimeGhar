import { AnimeData } from "@/types";
import { create } from "zustand";

type AppStore = {
    homeData: AnimeData;
    setHomeData: (data: AnimeData) => void;
};

export const useAppStore = create<AppStore>()((set) => ({
    homeData: {} as AnimeData,
    setHomeData: (data) => set((state) => ({ ...state, homeData: data })),
}));
