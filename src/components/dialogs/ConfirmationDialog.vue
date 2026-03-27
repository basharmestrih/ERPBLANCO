<template>
  <v-dialog v-model="model" max-width="480" persistent>
    <v-card border elevation="4">
      <v-toolbar color="surface" elevation="1">
        <v-toolbar-title class="text-h6 font-weight-bold">
          {{ title }}
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          icon="mdi-close"
          variant="text"
          :disabled="submitting"
          @click="close"
        />
      </v-toolbar>

      <v-card-text class="pa-6 text-body-1 text-medium-emphasis">
        {{ message }}
      </v-card-text>

      <v-card-actions class="pa-6">
        <v-spacer />

        <v-btn
          variant="tonal"
          color="grey-darken-1"
          class="px-6"
          :disabled="submitting"
          @click="close"
        >
          {{ t("common.cancel") }}
        </v-btn>

        <v-btn
          variant="tonal"
          :color="confirmColor"
          class="px-8"
          :loading="submitting"
          @click="confirm"
        >
          {{ confirmLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useLocale } from "@/composables/useLocale"

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    message: string
    confirmLabel?: string
    confirmColor?: string
    action: () => void | Promise<void>
  }>(),
  {
    confirmLabel: "Confirm",
    confirmColor: "primary",
  },
)

const emit = defineEmits(["update:modelValue"])

const submitting = ref(false)

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
})

const close = () => {
  if (submitting.value) return
  emit("update:modelValue", false)
}

const confirm = async () => {
  if (submitting.value) return

  emit("update:modelValue", false)
  submitting.value = true

  try {
    await props.action()
  } finally {
    submitting.value = false
  }
}

const { t } = useLocale()
</script>
