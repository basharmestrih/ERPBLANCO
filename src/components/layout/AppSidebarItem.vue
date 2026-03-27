<template>
  <v-list-item
    :value="value"
    :class="{ 'app-sidebar-item--rtl': isRtl }"
    :prepend-icon="isRtl ? undefined : icon"
    :prepend-icon-color="isRtl ? undefined : iconColor"
    :append-icon="isRtl ? icon : undefined"
    :append-icon-color="isRtl ? iconColor : undefined"
    :to="isLogout ? undefined : `/${value}`"
    @click="handleClick"
  >
    <template #title>
      <span :class="['font-weight-bold', isLogout ? 'text-red' : '', { 'w-100 text-right': isRtl }]">
        {{ title }}
      </span>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{
  icon: string
  title: string
  value: string
  isLogout?: boolean
}>()

const router = useRouter()
const authStore = useAuthStore()
const { isRtl } = useLocale()
const iconColor = computed(() => (props.isLogout ? 'red' : 'primary'))

const handleClick = () => {
  if (!props.isLogout) {
    return
  }

  authStore.logout()
  router.push('/login')
}

</script>

<style scoped>
.app-sidebar-item--rtl {
  text-align: right;
}

.app-sidebar-item--rtl :deep(.v-list-item__content) {
  text-align: right;
}
</style>
