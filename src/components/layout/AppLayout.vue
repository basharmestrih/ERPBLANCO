<template>
  <v-app :rtl="isRtl">
    <v-navigation-drawer app permanent :location="isRtl ? 'right' : 'left'">
      <AppSidebar />
    </v-navigation-drawer>

    <AppTopbar app />

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
import { useLocale } from '@/composables/useLocale'

const { isRtl } = useLocale()
</script>
