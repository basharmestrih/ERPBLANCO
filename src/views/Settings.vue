<template>
  <section :class="['settings-page', { 'settings-page--rtl': isRtl }]">


    <div class="settings-section mt-2">
      <h3 class="text-h5 font-weight-bold">
        {{ t("settings.langtitle") }}
      </h3>
      <p class="text-body-2 text-medium-emphasis mt-1">
        {{ t("settings.langsubtitle") }}
      </p>

      <div :class="['options-row mt-4', { 'options-row--rtl': isRtl }]">
        <label
          v-for="item in availableLocales"
          :key="item.value"
          :class="[
            'selectable-card',
            {
              'selectable-card--active': currentLocale === item.value,
              'selectable-card--rtl': isRtl,
            },
          ]"
          @click="handleLocaleChange(item.value)"
        >
          <div class="d-flex align-center">
            <v-checkbox
              :model-value="currentLocale === item.value"
              hide-details
              density="compact"
              :ripple="false"
              class="shrink-checkbox"
              color="primary"
            />
            <div class="ml-3">
              <div class="text-subtitle-2 font-weight-bold">{{ item.label }}</div>
            </div>
          </div>
        </label>
      </div>
    </div>

    <v-divider class="my-10" />

    <div class="settings-section">
      <h3 class="text-h5 font-weight-bold">
        {{ t("settings.themetitle") }} (released soon)
      </h3>
      <p class="text-body-2 text-medium-emphasis mt-1">
        {{ t("settings.themesubtitle") }}
      </p>

      <div class="options-row mt-4">
        <label 
          :class="['selectable-card', { 'selectable-card--active': tempTheme === 'light' }]"
          @click="tempTheme = 'light'"
        >
          <div class="d-flex align-center">
            <v-radio
              value="light"
              :model-value="tempTheme"
              hide-details
              density="compact"
              color="primary"
            />
            <span class="ml-3 text-subtitle-2 font-weight-bold">Light Mode</span>
          </div>
        </label>

        <label 
          :class="['selectable-card', { 'selectable-card--active': tempTheme === 'dark' }]"
          @click="tempTheme = 'dark'"
        >
          <div class="d-flex align-center">
            <v-radio
              value="dark"
              :model-value="tempTheme"
              hide-details
              density="compact"
              color="primary"
            />
            <span class="ml-3 text-subtitle-2 font-weight-bold">Dark Mode</span>
          </div>
        </label>
      </div>
    </div>
    
    <v-divider class="my-10" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLocale } from "@/composables/useLocale";
import type { SupportedLocale } from "@/localization/messages";

const { availableLocales, currentLocale, isRtl, setLocale, t } = useLocale();

const tempTheme = ref<"light" | "dark">("light");

const handleLocaleChange = (value: string | null) => {
  if (!value) return;
  setLocale(value as SupportedLocale);
};
</script>

<style scoped>
.settings-page {
  padding:  2px 24px;
  max-width: 900px;
  margin: 0 auto;
}

.settings-page--rtl {
  direction: rtl;
}

/* Horizontal Layout Logic */
.options-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.options-row--rtl {
  direction: rtl;
}

/* Card Styling for Options */
.selectable-card {
  flex: 1;
  min-width: 200px;
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.selectable-card:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
  border-color: rgba(var(--v-theme-primary), 0.4);
}

.selectable-card--active {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}

/* Fix for Vuetify checkbox/radio alignment in rows */
.shrink-checkbox {
  flex: 0 0 auto;
}

.selectable-card--rtl {
  text-align: right;
}
</style>