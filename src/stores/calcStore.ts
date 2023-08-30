import { ref } from "vue";
import { defineStore } from "pinia";

export const useCalcStore = defineStore('calculator', () => {
    const finalResult = ref<number>(0);

    return { finalResult }
})