<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useColorMode } from "@vueuse/core";
import { Moon, Sun } from "lucide-vue-next";

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode({ disableTransition: false });
</script>

<template>
    <div class="fixed top-6 right-6">
        <Button
            variant="outline"
            size="icon"
            @click="mode = mode === 'light' ? 'dark' : 'light'"
            class="p-2 rounded-full"
        >
            <Moon
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Sun
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
    </div>
</template>
