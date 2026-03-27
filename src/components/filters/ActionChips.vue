<template>
  <div class="d-flex flex-wrap ga-2 px-6 pb-4">
    <v-chip
      v-for="chip in chips"
      :key="chip.title"
      label
      :color="chip.active ? activeColor : defaultColor"
      :variant="chip.active ? 'flat' : 'tonal'"
      class="font-weight-medium"
      :disabled="loadingTitle === chip.title"
      @click="handleClick(chip)"
    >
      <v-progress-circular
        v-if="loadingTitle === chip.title"
        indeterminate
        size="14"
        width="2"
        class="mr-2"
      />
      {{ chip.title }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

type ActionChip = {
  title: string
  active?: boolean
  action: () => void | Promise<void>
}

withDefaults(
  defineProps<{
    chips: ActionChip[]
    activeColor?: string
    defaultColor?: string
  }>(),
  {
    activeColor: "red",
    defaultColor: "grey-darken-1",
  },
)

const loadingTitle = ref<string | null>(null)

const handleClick = async (chip: ActionChip) => {
  if (loadingTitle.value) return

  loadingTitle.value = chip.title

  try {
    await chip.action()
  } finally {
    loadingTitle.value = null
  }
}
</script>
