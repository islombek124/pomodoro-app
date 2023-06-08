<script setup lang="ts">
    import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
    import clickSound from "~/components/assets/click.mp3";
    import { useSettings } from "~/stores/settings";

    const store = useSettings();

    const activeTab = ref<0 | 1 | 2>(0);
    const currentPomodorro = ref<number>(0);
    const isRunning = ref<boolean>(false);

    function playSound(): void {
        const audio = new Audio(clickSound);
        audio.play();
    }

    function onTimerEnd(name?: "pomodorro" | "short-break" | "long-break"): void {
        if (!name)
            return;

        if (name !== "pomodorro") {
            activeTab.value = 0;
            return;
        }

        currentPomodorro.value++;
        activeTab.value = currentPomodorro.value && currentPomodorro.value % store.longBreakInterval === 0 ? 2 : 1;
    }

    function LongBreakInterval(value: any) {
        store.longBreakInterval = Number(value);
    }

    function started(val: boolean): void {
        isRunning.value = val;
    }
</script>

<template>
    <main class="h-screen flex justify-center text-center text-white bg-[#ba4949]">
        <div class="mx-auto max-w-xl w-full space-y-9 mt-3">
            <header>
                <AppNav>
                    <template #modal>
                        <AppModal @long-break-interval="LongBreakInterval" />
                    </template>
                </AppNav>
            </header>
            <div class="mx-auto max-w-lg w-full space-y-5 px-2">
                <div class="rounded-lg bg-white/10 p-10 w-full mx-auto shadow-lg relative">
                    <h1 class="duration-200 font-bold text-3xl absolute left-1/2 -translate-1/2 text-gray-200/80 mt-5" :class="[isRunning ? 'opacity-100 visible' : 'opacity-0 invisible']">
                        {{ ['Pomodoro', 'Short Break', 'Long Break'][activeTab] }}
                    </h1>
                    <TabGroup :selected-index="activeTab" @change="playSound">
                        <TabList class="flex items-center space-x-7 text-base justify-center duration-200" :class="[!isRunning ? 'visible' : 'opacity-0 invisible']">
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    class="rounded px-4 py-2 text-white active:translate-y-1"
                                    :class="{ 'bg-gray-600/50 font-bold': selected, '': !selected }" @click="activeTab = 0"
                                >
                                    Pomo<span class="sm:inline-block hidden">doro</span>
                                </button>
                            </Tab>
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    class="rounded px-4 py-2 text-white active:translate-y-1"
                                    :class="{ 'bg-gray-600/50 font-bold': selected, '': !selected }" @click="activeTab = 1"
                                >
                                    Short <span class="sm:inline-block hidden">break</span>
                                </button>
                            </Tab>
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    class="rounded px-4 py-2 text-white active:translate-y-1"
                                    :class="{ 'bg-gray-600/50 font-bold': selected, '': !selected }" @click="activeTab = 2"
                                >
                                    Long <span class="sm:inline-block hidden">break</span>
                                </button>
                            </Tab>
                        </TabList>
                        <TabPanels class="mt-5">
                            <TabPanel>
                                <AppTimer :time="store.pomodorro" :auto-start-pomodoros="store.autoStartPomodoros" @end="onTimerEnd('pomodorro')" @started="started" />
                            </TabPanel>
                            <TabPanel>
                                <AppTimer :time="store.shortBreak" :auto-start-breaks="store.autoStartBreaks" @end="onTimerEnd('short-break')" @started="started">
                                    <button class="text-4xl text-white absolute right-9" @click="onTimerEnd('short-break')">
                                        <font-awesome-icon icon="fa-solid fa-forward-step" class="text-white" />
                                    </button>
                                </AppTimer>
                            </TabPanel>
                            <TabPanel>
                                <AppTimer :time="store.longBreak" :auto-start-breaks="store.autoStartBreaks" @end="onTimerEnd('long-break')" @started="started">
                                    <button class="text-4xl text-white absolute right-9" @click="onTimerEnd('long-break')">
                                        <font-awesome-icon icon="fa-solid fa-forward-step" class="text-white" />
                                    </button>
                                </AppTimer>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
* {
    outline: none;
}
</style>
