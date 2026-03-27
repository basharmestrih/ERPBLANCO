<template>
  <v-app-bar
    color="transparent"
    flat
    height="72"
    :class="['px-8 border-b', { 'app-topbar--rtl': isRtl }]"
  >
    <div :class="['app-topbar__content', { 'app-topbar__content--rtl': isRtl }]">
      <v-toolbar-title :class="['text-h6 font-weight-bold tracking-tight app-topbar__title', { 'text-right': isRtl, 'text-left': !isRtl }]">
        {{ pageTitle }}
      </v-toolbar-title>

      <div :class="['d-flex align-center app-topbar__actions', { 'app-topbar__actions--rtl': isRtl }]">
        <v-btn icon variant="text" color="grey-darken-1" class="mx-1">
          <v-icon size="22">mdi-email-outline</v-icon>
          <v-tooltip activator="parent" location="bottom">{{ t("common.messages") }}</v-tooltip>
        </v-btn>
        <v-btn icon variant="text" color="grey-darken-1" class="mx-1">
          <v-icon size="22">mdi-bell-outline</v-icon>
          <v-badge color="error" dot offset-x="3" offset-y="3">
            <v-tooltip activator="parent" location="bottom">{{ t("common.notifications") }}</v-tooltip>
          </v-badge>
        </v-btn>
        <v-btn icon variant="text" color="grey-darken-1" class="mx-1" to="/settings">
          <v-icon size="22">mdi-cog-outline</v-icon>
          <v-tooltip activator="parent" location="bottom">{{ t("common.settings") }}</v-tooltip>
        </v-btn>
        <v-divider vertical inset class="mx-2 my-4"></v-divider>
        <v-btn variant="text" height="48" class="px-2 rounded-lg">
          <div :class="['d-flex align-center', { 'flex-row-reverse': isRtl }]">
            <div :class="[isRtl ? 'text-right me-3' : 'text-right me-3', 'd-none d-sm-block']">
              <div class="text-subtitle-2 font-weight-bold lh-1">{{ userName }}</div>
              <div class="text-caption text-medium-emphasis">{{ userRole }}</div>
            </div>
            <v-avatar size="40" class="elevation-2 mr-2">
              <span class="mtext-subtitle-2 font-weight-bold">{{ userInitials }}</span>
            </v-avatar>
          </div>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useLocale } from '@/composables/useLocale'

const route = useRoute()
const authStore = useAuthStore()
const { isRtl, t } = useLocale()

const pageTitle = computed(() => t(String(route.meta.titleKey || 'route.dashboard')))
const userName = computed(() => authStore.user?.name || t('common.user'))
const userRole = computed(() => authStore.primaryRole)
const userInitials = computed(() => {
  const name = authStore.user?.name?.trim()

  if (!name) {
    return 'U'
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')
})

</script>
<style scoped>
.lh-1 {
  line-height: 1.2;
}
.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.app-topbar__content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.app-topbar__content--rtl {
  flex-direction: row-reverse;
}

.app-topbar__title {
  flex: 1;
  min-width: 0;
}

.app-topbar__actions--rtl {
  flex-direction: row-reverse;
}

.v-btn--icon {
  transition: transform 0.2s ease;
}
.v-btn--icon:hover {
  transform: translateY(-1px);
}
</style>
