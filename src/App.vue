<script setup lang="ts">
import AppLogo from "@/components/tools/AppLogo.vue";
import SwitchTheme from "@/components/tools/SwitchTheme.vue";
import { Toaster } from '@/components/ui/sonner';
</script>

<template>
    <SwitchTheme />
    <Toaster :rich-colors="true" :close-button="true"/>
    <div class="h-screen flex items-center justify-center">
        <div class="space-y-4">
            <AppLogo />
            <p class="text-center">Transforme tes devises, sans frontières</p>
            <router-view />
        </div>
    </div>
</template>
