import { ref } from "vue";
import type { Members } from "../types/main.ts";

export const members = ref<Members[]>([
    {
        members: '',
        img: '',
        pic: '',
        presence: '',
        hp: ''
    }
]);
