<template>
  <v-dialog v-model="model" :max-width="maxWidth" persistent>
    <v-card :class="{ 'form-dialog--rtl': isRtl }" border elevation="4">

      <!-- HEADER -->
      <v-toolbar :class="{ 'form-dialog__toolbar--rtl': isRtl }" color="surface" elevation="1">
        <v-toolbar-title :class="['text-h6 font-weight-bold', { 'text-right': isRtl }]">
          {{ title }}
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="close"
        />
      </v-toolbar>

      <!-- BODY -->
      <v-card-text :class="['pa-6', { 'text-right': isRtl }]">
        <slot />
      </v-card-text>

      <!-- ACTIONS -->
      <v-card-actions :class="['pa-6', { 'form-dialog__actions--rtl': isRtl }]">
        <v-spacer />

        <v-btn
          variant="tonal"
          color="error"
          class="px-6"
          @click="close"
        >
          {{ t("common.cancel") }}
        </v-btn>

        <v-btn
          variant="tonal"
          color="primary"
          class="px-10"
          :loading="loading"
          @click="$emit('submit')"
        >
          {{ submitLabel }}
        </v-btn>

      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'


const props = defineProps({
  modelValue: Boolean,
  title: String,
  submitLabel: {
    type: String,
    default: "Save"
  },
  loading: Boolean,
  maxWidth: {
    type: String,
    default: "900"
  }
})

const emit = defineEmits([
  "update:modelValue",
  "submit"
])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})

const close = () => {
  emit("update:modelValue", false)
}

const { isRtl, t } = useLocale()

</script>

<style scoped>
.form-dialog--rtl {
  direction: rtl;
}

.form-dialog__toolbar--rtl {
  direction: rtl;
}

.form-dialog__actions--rtl {
  direction: rtl;
}
</style>
