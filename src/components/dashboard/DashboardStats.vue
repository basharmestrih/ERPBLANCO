<template>
  <v-card
    rounded="xl"
    elevation="4"
    :class="['px-5 py-4 d-flex flex-column dashboard-stats', { 'dashboard-stats--rtl': isRtl }]"
    :dir="isRtl ? 'rtl' : 'ltr'"
    color="#1f1f22"
    min-height="160"
    border="sm"
  >
    <div class="flex align-start justify-space-between mb-2">
      <h3 class="mb-4 tracking-wider dashboard-stats__title">
        {{ title }}
      </h3>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center justify-space-between mt-8">
      <div class="flex flex-col">
        <h1
          class="font-weight-black mt-0 mb-0 tracking-wider dashboard-stats__value"
          style="color: oklch(69.6% 0.17 162.48); line-height: 1.2;"
        >
          {{ formatNumber(value) }}
        </h1>

        <span
          v-if="subtitle"
          class="text-caption dashboard-stats__subtitle"
        >
          {{ subtitle }}
        </span>
      </div>

      <v-avatar
        size="56"
        color="#2a2a30"
        :class="['elevation-1 flex-shrink-0', isRtl ? 'mr-4' : 'ml-0']"
      >
        <v-icon size="28" style="color: oklch(69.6% 0.17 162.48);">
          {{ icon }}
        </v-icon>
      </v-avatar>
    </div>

    <v-spacer></v-spacer>
  </v-card>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

withDefaults(
  defineProps<{
    title: string
    value: string | number
    icon?: string
    subtitle?: string
  }>(),
  {
    icon: 'mdi-chart-box-outline',
    subtitle: '',
  },
)

const { isRtl } = useLocale()

function formatNumber(value: string | number): string {
  if (typeof value === 'string') {
    value = value.replace(/,/g, '') // 🔥 remove commas
  }

  const num = Number(value)

  if (isNaN(num)) return String(value)

  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace('.0', '') + 'M'

  if (num >= 1_000)
    return (num / 1_000).toFixed(1).replace('.0', '') + 'K'

  return new Intl.NumberFormat().format(num)
}
</script>

<style scoped>
.dashboard-stats {
  transition: all 0.3s ease;
}

.dashboard-stats--rtl {
  direction: rtl;
}

.dashboard-stats__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
}

.tracking-wider {
  letter-spacing: 0.05rem !important;
}

.dashboard-stats--rtl .tracking-wider {
  letter-spacing: 0 !important;
}

.dashboard-stats__value {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-stats__subtitle {
  display: block;
  font-size: 0.7rem;
  opacity: 0.72;
  margin-top: 0.2rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>