<template>
  <v-card :color="color" class="pa-4" max-width="500">
    <div :class="['d-flex align-center dashboard-card__content', { 'dashboard-card__content--rtl': isRtl }]">
      <div :class="['dashboard-card__text', { 'dashboard-card__text--rtl': isRtl }]">
        <v-card-title :class="['text-h5', { 'text-right': isRtl }]">{{ title }}</v-card-title>
        <v-card-subtitle>{{ subtitle }}</v-card-subtitle>

        <v-card-actions :class="{ 'justify-end px-0': isRtl }">
          <v-btn icon variant="text">
            <v-icon>{{ navIcon }}</v-icon>
          </v-btn>
        </v-card-actions>
      </div>

      <v-avatar size="140" rounded="0" class="dashboard-card__media rounded-lg">
        <v-img :src="imgSrc" />
      </v-avatar>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

defineProps<{
  title: string
  subtitle: string
  value?: string | number
  imgSrc: string
  color?: string
  navIcon?: string
}>()

const { isRtl } = useLocale()
</script>

<style scoped>
.dashboard-card__content {
  gap: 1rem;
  justify-content: space-between;
}

.dashboard-card__content--rtl {
  direction: rtl;
}

.dashboard-card__text {
  flex: 1;
  min-width: 0;
}

.dashboard-card__text--rtl {
  text-align: right;
}

.dashboard-card__text :deep(.v-card-subtitle) {
  white-space: normal;
}

.dashboard-card__text--rtl :deep(.v-card-subtitle) {
  text-align: right;
}

.dashboard-card__media {
  flex-shrink: 0;
}

.v-card:hover {
  transform: scale(1.02);
  transition: 0.3s;
}
</style>
