<template>
  <v-card elevation="6" class="landing-feature-card" :class="variantClass">
    <div class="landing-feature-card__heading">
      <span class="landing-feature-card__title">{{ title }}</span>
      <v-icon v-if="icon" class="landing-feature-card__icon">{{ icon }}</v-icon>
    </div>
    <p class="landing-feature-card__subtitle">{{ subtitle }}</p>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle: string
  icon?: string
  variant?: 'light' | 'muted'
}>()

const variantClass = computed(() =>
  props.variant === 'muted' ? 'landing-feature-card--muted' : 'landing-feature-card--light'
)
</script>

<style scoped>
.landing-feature-card {
  border-radius: 1rem;
  min-height: 110px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(6px);
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
}

.landing-feature-card--light {
  background: rgba(255, 255, 255, 0.08);
}

.landing-feature-card--muted {
  background: rgba(255, 255, 255, 0.04);
}

.landing-feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.55);
}

.landing-feature-card__heading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.landing-feature-card__title {
  flex: 1;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.landing-feature-card__icon {
  font-size: 1.25rem;
  color: #f8c05c;
}

.landing-feature-card__subtitle {
  margin: 0;
  text-align: center;
  opacity: 0.8;
}
</style>
