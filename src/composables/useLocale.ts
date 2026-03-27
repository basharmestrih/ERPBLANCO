import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useLocaleStore } from "@/stores/localeStore"
import type { SupportedLocale } from "@/localization/messages"

export function useLocale() {
  const store = useLocaleStore()
  const { locale } = storeToRefs(store)

  const currentLocale = computed(() => locale.value)
  const currentDirection = computed(() => store.direction)
  const isRtl = computed(() => store.isRtl)

  const t = (key: string, params?: Record<string, string | number>) => store.t(key, params)
  const setLocale = (value: SupportedLocale) => store.setLocale(value)

  return {
    locale,
    currentLocale,
    currentDirection,
    isRtl,
    availableLocales: store.availableLocales,
    t,
    setLocale,
  }
}
