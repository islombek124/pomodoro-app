<script setup lang="ts">
    import {
        Dialog,
        DialogPanel,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    } from "@headlessui/vue";
    import { useSettings } from "~/stores/settings";

    const store = useSettings();
    const isOpen = ref<boolean>(false);

    function closeModal(): void {
        isOpen.value = false;
    }
    function openModal(): void {
        isOpen.value = true;
    }
</script>

<template>
    <div class="flex items-center justify-center">
        <button
            type="button"
            class="rounded bg-gray-600/50 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            @click="openModal"
        >
            <font-awesome-icon icon="fa-solid fa-gear" /> <span class="sm:inline-block hidden">Settings</span>
        </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="closeModal">
            <TransitionChild
                as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template" enter="duration-200 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="text-black w-full max-w-md transform overflow-hidden space-y-4 rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all font-bold"
                        >
                            <div class="flex items-center justify-between">
                                <DialogTitle as="div" class="text-lg font-bold leading-6 text-gray-900">
                                    Settings
                                </DialogTitle>

                                <button type="button" class="font-bold text-black text-2xl" @click="closeModal">
                                    <font-awesome-icon icon="fa-solid fa-xmark" />
                                </button>
                            </div>
                            <div class="text-base text-gray-400 font-bold uppercase mt-7">
                                <font-awesome-icon icon="fa-solid fa-clock" /> Timer
                            </div>
                            <div class="space-y-2">
                                <div>
                                    <span>Time (minutes)</span>
                                </div>
                                <div class="flex items-center justify-between space-x-5">
                                    <div class="w-40">
                                        <label class="text-gray-400">Pomodoro</label>
                                        <input
                                            type="number"
                                            min="1" class="w-full px-4 py-2 rounded bg-gray-400/40"
                                            :value="store.pomodorro / 60"
                                            @input="e => store.pomodorro = e.target.value * 60"
                                        >
                                    </div>
                                    <div class="w-40">
                                        <label class="text-gray-400">Short Break</label>
                                        <input

                                            type="number" min="1"
                                            class="w-full px-4 py-2 rounded bg-gray-400/40"
                                            :value="store.shortBreak / 60"
                                            @input="e => store.shortBreak = e.target.value * 60"
                                        >
                                    </div>
                                    <div class="w-40">
                                        <label class="text-gray-400">Long Break</label>
                                        <input
                                            type="number" min="1" class="w-full px-4 py-2 rounded bg-gray-400/40"
                                            :value="store.longBreak / 60"
                                            @input="e => store.longBreak = e.target.value * 60"
                                        >
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
