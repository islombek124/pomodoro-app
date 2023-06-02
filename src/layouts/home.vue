<script setup lang="ts">
    import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
    import clickSound from "~/components/assets/click.mp3";

    const activeTab = ref<0 | 1 | 2>(0);
    const currentPomodorro = ref<number>(0);

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
        activeTab.value = currentPomodorro.value && currentPomodorro.value % 4 === 0 ? 2 : 1;
    }
</script>

<template>
    <main class="h-screen flex justify-center text-center text-white">
        <div class="mx-auto max-w-xl w-full space-y-9 mt-3">
            <header>
                <AppNav>
                    <template #modal>
                        <AppModal />
                    </template>
                </AppNav>
            </header>
            <div class="mx-auto max-w-lg w-full space-y-5">
                <div class="rounded-lg bg-white/10 p-10 w-full mx-auto shadow-lg">
                    <TabGroup :selected-index="activeTab" @change="playSound">
                        <TabList class="flex items-center space-x-7 text-base justify-center">
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    class="rounded px-4 py-2 text-white"
                                    :class="{ 'bg-gray-600/50': selected, '': !selected }" @click="activeTab = 0"
                                >
                                    Pomodoro
                                </button>
                            </Tab>
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    class="rounded px-4 py-2 text-white"
                                    :class="{ 'bg-gray-600/50 ': selected, '': !selected }" @click="activeTab = 1"
                                >
                                    Short break
                                </button>
                            </Tab>
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    class="rounded px-4 py-2 text-white"
                                    :class="{ 'bg-gray-600/50': selected, '': !selected }" @click="activeTab = 2"
                                >
                                    Long break
                                </button>
                            </Tab>
                        </TabList>
                        <TabPanels class="mt-5">
                            <TabPanel>
                                <AppTimer :time="1500" @end="onTimerEnd('pomodorro')" />
                            </TabPanel>
                            <TabPanel>
                                <AppTimer :time="300" @end="onTimerEnd('short-break')" />
                            </TabPanel>
                            <TabPanel>
                                <AppTimer :time="900" @end="onTimerEnd('long-break')" />
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
