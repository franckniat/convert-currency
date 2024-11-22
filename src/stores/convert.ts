import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConvertStore = defineStore('convert', () => {
    const from = ref('USD')
    const to = ref('EUR')
    const amount = ref(1)
    const result = computed(() => {
        return amount.value * 0.84
    })
    function setFrom(value: string) {
        from.value = value
    }
    function setTo(value: string) {
        to.value = value
    }
    function setAmount(value: number) {
        amount.value = value
    }
    function convert() {
        // do the conversion
    }

    return { from, to, amount, result, setFrom, setTo, setAmount, convert }
})
