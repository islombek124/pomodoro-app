import { acceptHMRUpdate, defineStore } from "pinia";

export const useSettingsStore = defineStore("store", () => {
    const pomodorro = ref<number>(1500);
    const shortBreak = ref<number>(300);
    const longBreak = ref<number>(900);
    return { pomodorro, shortBreak, longBreak };
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
