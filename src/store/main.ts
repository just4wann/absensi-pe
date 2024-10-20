import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('store', () => {
    let presencing = ref<number[]>([])
    return { presencing }
})