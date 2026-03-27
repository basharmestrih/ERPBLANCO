<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.users" />
    <div v-else>
      <EntityTableCard
        :search-label="t('users.search')"
        :new-item-label="t('users.new')"
        :headers="headers"
        :items="users"
        @create="openCreateDialog"
      >
        <template #item.id="{ item }">
          <span class="font-weight-bold text-primary">#USR-{{ item.id }}</span>
        </template>

        <template #item.name="{ item }">
          <span class="text-body-2 font-weight-medium">{{ item.name }}</span>
        </template>

        <template #item.email="{ item }">
          <span class="text-body-2">{{ item.email }}</span>
        </template>

        <template #item.roles="{ item }">
          <div class="d-flex align-center ga-2 flex-wrap">
            <v-chip
              v-for="role in item.roles ?? []"
              :key="role"
              size="small"
              label
              variant="tonal"
              color="primary"
              class="text-uppercase font-weight-bold"
            >
              {{ role }}
            </v-chip>
            <span v-if="!(item.roles?.length)" class="text-body-2 text-medium-emphasis">{{ t("common.na") }}</span>
          </div>
        </template>

        <template #item.email_verified_at="{ item }">
          <span class="text-body-2">
            {{ item.email_verified_at ? formatDate(item.email_verified_at) : t("common.notVerified") }}
          </span>
        </template>

        <template #item.created_at="{ item }">
          <span class="text-body-2">
            {{ item.created_at ? formatDate(item.created_at) : t("common.na") }}
          </span>
        </template>
      </EntityTableCard>

      <FormDialog
        v-model="dialog"
        :title="t('users.dialogTitle')"
        :submit-label="t('users.dialogSubmit')"
        :loading="formLoading"
        max-width="760"
        @submit="submitUser"
      >
        <CreateUserForm />
      </FormDialog>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import EntityTableCard from "@/components/tables/EntityTableCard.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import FormDialog from "@/components/dialogs/FormDialog.vue"
import CreateUserForm from "@/components/forms/CreateUserForm.vue"
import { useUsers } from "@/composables/useUsers"
import { useLocale } from "@/composables/useLocale"

const { users, loading, formLoading, fetchUsers, fetchRoles, createUser, resetForm } = useUsers()
const { currentLocale, t } = useLocale()
const dialog = ref(false)

onMounted(() => {
  fetchUsers()
})

const openCreateDialog = async () => {
  if (!dialog.value) {
    await fetchRoles()
  }

  dialog.value = true
}

const submitUser = async () => {
  const saved = await createUser()

  if (saved) {
    dialog.value = false
  }
}

watch(dialog, (isOpen) => {
  if (!isOpen) {
    resetForm()
  }
})

const headers = computed(() => [
  { title: t("users.header.id"), key: "id", align: "start" as const },
  { title: t("users.header.name"), key: "name" },
  { title: t("users.header.email"), key: "email" },
  { title: t("users.header.roles"), key: "roles", align: "center" as const },
  { title: t("users.header.emailVerified"), key: "email_verified_at" },
  { title: t("users.header.createdAt"), key: "created_at", align: "end" as const },
])

const formatDate = (value: string) => new Date(value).toLocaleDateString(currentLocale.value)
</script>
