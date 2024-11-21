<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { onMounted, ref, watch } from "vue";

const modelValue = defineModel({
    type: String,
    required: true
});

const emit = defineEmits(["update:modelValue"]);
const value = ref("");

type SymbolsResponse = { success: boolean; symbols: { [key: string]: string } };

const symbols = ref<SymbolsResponse>();

const fetchSymbols = async () => {
    const response = await fetch(
        `https://api.metalpriceapi.com/v1/symbols?api_key=${import.meta.env.VITE_FIXER_API_KEY}`
    );
    const data = await response.json();
    symbols.value = data;
};

onMounted(() => {
    fetchSymbols();
});

watch(value, (newValue) => {
    emit("update:modelValue", newValue);
});

const open = ref(false);
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-fit justify-between gap-3 text-left font-medium"
            >
                {{
                    value
                        ? symbols?.symbols[value]
                        : "Choisir une monnaie"
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-fit p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Rechercher..." />
                <CommandEmpty>Aucune monnaie trouvée.</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            v-for="(name, code) in symbols?.symbols"
                            :key="code"
                            :value="code"
                            @select="
                                (ev) => {
                                    if (typeof ev.detail.value === 'string') {
                                        value = ev.detail.value;
                                        console.log(value);
                                    }
                                    open = false;
                                }
                            "
                        >
                            {{ name }}
                            <Check
                                :class="
                                    cn(
                                        'ml-auto h-4 w-4',
                                        value === code
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )
                                "
                            />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
