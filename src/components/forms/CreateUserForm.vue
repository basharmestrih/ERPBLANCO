<template>
  <v-form>
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h3 class="text-subtitle-1 font-weight-bold">{{ t("users.form.title") }}</h3>
        <p class="text-caption text-grey">{{ t("users.form.subtitle") }}</p>
      </div>
    </div>

    <v-alert
      v-if="displayError"
      type="error"
      variant="tonal"
      density="comfortable"
      class="mb-4"
    >
      {{ displayError }}
    </v-alert>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="userForm.name"
          :label="t('users.form.fullName')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="userForm.email"
          :label="t('users.form.email')"
          type="email"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="userForm.password"
          :label="t('users.form.password')"
          type="password"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="userForm.role"
          :items="roles"
          :label="t('users.form.role')"
          variant="outlined"
          density="compact"
          hide-details
          :loading="rolesLoading"
          :placeholder="t('users.form.rolePlaceholder')"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useUsers } from "@/composables/useUsers"
import { useLocale } from "@/composables/useLocale"

const { userForm, roles, rolesLoading, formError, fetchRoles } = useUsers()
const { t } = useLocale()
const displayError = computed(() =>
  formError.value.startsWith("users.") ? t(formError.value) : formError.value,
)

onMounted(() => {
  if (!roles.value.length) {
    fetchRoles()
  }
})
</script>
