<script setup lang="ts">
    import { ref } from "vue";
    import kitchenSound from "~/components/assets/kitchen.mp3";

    const props = defineProps<{
        time: number
        autoStartPomodoros: boolean
        autoStartBreaks: boolean
    }>();
    const emit = defineEmits<{
        (e: "end"): void
        (e: "started", val: boolean): void
    }>();

    const timerInterval = ref<number | undefined>(undefined);
    const isRunning = ref<boolean>(false);
    const remaining = ref<number>(props.time);

    const minutes = computed(() => pad(Math.floor(remaining.value / 60)));
    const seconds = computed(() => pad(remaining.value % 60));

    function pad(timePart: number): string {
        return timePart.toString().padStart(2, "0");
    }

    function onTick() {
        if (remaining.value === 0) {
            onTimeElapsed();
            return;
        }

        remaining.value--;
    }

    function start() {
        timerInterval.value = window.setInterval(onTick, 1000);
        isRunning.value = true;
        emit("started", isRunning.value);
    }

    function stop() {
        isRunning.value = false;

        if (!timerInterval.value)
            return;

        clearInterval(timerInterval.value);
        timerInterval.value = undefined;
        emit("started", isRunning.value);
    }

    function onTimeElapsed() {
        new Audio(kitchenSound).play();
        stop();
        emit("end");
    }

    watch(() => props.time, (newVal) => {
        remaining.value = newVal;
    });

    onMounted(() => props.autoStartPomodoros || props.autoStartBreaks ? start() : stop());

    onBeforeUnmount(() => stop());
</script>

<template>
    <div class="font-bold space-y-5 w-full">
        <div class="md:text-9xl text-8xl text-center">
            {{ minutes }}:{{ seconds }}
        </div>
        <div>
            <div v-if="!isRunning">
                <button class="px-10 py-2 rounded bg-white text-current uppercase startBtn" @click="start">
                    Start
                </button>
            </div>
            <div v-else class="flex items-center space-x-5 justify-center relative">
                <button class="px-10 py-2 rounded bg-white uppercase pauseBtn" @click="stop">
                    Pause
                </button>
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    color: #ba4949;
}

.startBtn {
    box-shadow: 0 5px 0 rgb(193, 191, 191);
}

.pauseBtn {
    position: relative;
    top: 5px;
    box-shadow: 0;
}
</style>
