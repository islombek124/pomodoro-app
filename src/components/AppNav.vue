<template>
    <nav class="w-full flex items-center justify-between border-b  border-gray-700/20 px-2 py-3">
        <div class="flex items-center space-x-1 text-lg font-bold">
            <font-awesome-icon icon="fa-solid fa-circle-check" class="text-2xl" /><span>Pomodoro App</span>
        </div>
        <div>
            <slot name="modal" />
        </div>
    </nav>
</template>
