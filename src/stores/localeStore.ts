import { defineStore } from "pinia"
import { localeDirections, localeLabels, messages, type SupportedLocale } from "@/localization/messages"

const LOCALE_KEY = "app_locale"

const isSupportedLocale = (value: string | null): value is SupportedLocale =>
  value === "en" || value === "ar" || value === "fr"

const resolveLocale = (): SupportedLocale => {
  const saved = localStorage.getItem(LOCALE_KEY)
  return isSupportedLocale(saved) ? saved : "en"
}

export const useLocaleStore = defineStore("locale", {
  state: () => ({
    locale: resolveLocale() as SupportedLocale,
  }),

  getters: {
    direction: (state) => localeDirections[state.locale],
    isRtl: (state) => localeDirections[state.locale] === "rtl",
    availableLocales: () =>
      (Object.keys(localeLabels) as SupportedLocale[]).map((value) => ({
        value,
        label: localeLabels[value],
        direction: localeDirections[value],
      })),
  },

  actions: {
    setLocale(locale: SupportedLocale) {
      this.locale = locale
      localStorage.setItem(LOCALE_KEY, locale)
      this.applyToDocument()
    },

    applyToDocument() {
      document.documentElement.lang = this.locale
      document.documentElement.dir = this.direction
      document.body.dir = this.direction
      document.body.dataset.locale = this.locale
    },

    t(key: string, params?: Record<string, string | number>) {
      const value = messages[this.locale][key] ?? messages.en[key] ?? key
      return typeof value === "function" ? value(params) : value
    },
  },
})
