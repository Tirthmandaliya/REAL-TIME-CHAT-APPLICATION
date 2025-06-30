import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme : localStorage.getItem("theme") || "light", // Default theme is light
    setTheme : (theme) => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
        set({ theme });
    }
}));