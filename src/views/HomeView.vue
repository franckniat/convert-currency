<script setup lang="ts">
import Combobox from "@/components/tools/Combobox.vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { toast } from 'vue-sonner'
import { ref } from "vue";
import { useConvertStore } from "@/stores/convert";
const amount = ref(0);
const fromCurrency = ref("");
const toCurrency = ref("");
const showResult = ref(false);
const convertedAmount = ref(0);
const convert = useConvertStore();
const convertCurrency = async () => {
    if(amount.value === 0 || fromCurrency.value === "" || toCurrency.value === "") {
        toast.error('Veuillez remplir tous les champs');
        return;
    }
    convert.setAmount(amount.value);
    convert.setFrom(fromCurrency.value);
    convert.setTo(toCurrency.value);
    const response = await fetch(
        `https://api.metalpriceapi.com/v1/convert?api_key=${import.meta.env.VITE_FIXER_API_KEY}&from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amount.value}`
    );
    const data = await response.json();
    showResult.value = true;
    for(let i = 0; i <= data.result; i++) {
        setTimeout(() => {
            convertedAmount.value = i;
        }, 300);
    }
};
</script>

<template>
    <form class="flex flex-col gap-5 items-center" @submit.prevent="convertCurrency">
        <div class="flex items-center gap-2">
            <Input class="w-[300px] h-9" v-model="amount" type="number" />
            <Combobox v-model="fromCurrency" />
            <span>pour</span>
            <Combobox v-model="toCurrency" />
        </div>
        <Button type="submit" class="w-[300px] h-9">Convertir</Button>
        <div class="flex flex-col items-center gap-3 text-primary" v-if="showResult">
            <span class="text-foreground">Montant converti</span>
            <span class="text-2xl font-bold">{{ convertedAmount }} {{ toCurrency }}</span>
        </div>
    </form>
</template>
