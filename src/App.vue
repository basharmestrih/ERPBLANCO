<template>
  <AppLayout v-if="!hideLayout">
    <router-view />
  </AppLayout>
  <router-view v-else />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useLocaleStore } from '@/stores/localeStore'

const AppLayout = defineAsyncComponent(() => import('@/components/layout/AppLayout.vue'))

const route = useRoute()
const authStore = useAuthStore()
const localeStore = useLocaleStore()

const hideLayout = computed(() => Boolean(route.meta.hideLayout))

onMounted(() => {
  authStore.fetchCurrentUser()
  localeStore.applyToDocument()
})
</script>
