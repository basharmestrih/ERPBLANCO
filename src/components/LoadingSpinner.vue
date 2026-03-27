<template>
  <div class="loading-spinner" role="status" aria-live="polite">
    <v-progress-circular
      indeterminate
      :size="size"
      :width="width"
      :color="color"
    />
    <p v-if="message" class="loading-spinner__message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLocale } from "@/composables/useLocale"

const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 56,
  },
  width: {
    type: Number,
    default: 4,
  },
  color: {
    type: String,
    default: "primary",
  },
})

const { size, width, color } = props
const { t } = useLocale()
const message = computed(() => (props.message ? t(props.message) : ""))
</script>

<style scoped>
.loading-spinner {
  min-height: 320px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.92);
  text-align: center;
}

.loading-spinner__message {
  margin: 0;
  opacity: 0.8;
  font-size: 0.95rem;
}
</style>
