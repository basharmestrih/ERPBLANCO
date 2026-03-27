<template>
  <v-app class="login-page">
    <v-main>
      <div class="login-shell">
        <section class="login-panel">
          <div class="login-content">
            <div class="brand-mark mb-2">ERP BLANCO</div>
            <h4 class="text-xl font-weight-bold mb-2">{{ t("login.signIn") }}</h4>
            <p class="text-body-2 text-medium-emphasis mb-6">
              {{ t("login.subtitle") }}
            </p>

            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              class="mb-4"
              density="comfortable"
            >
              {{ errorMessage }}
            </v-alert>

            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.email"
                class="login-field mb-3"
                :label="t('login.email')"
                type="email"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-email-outline"
                bg-color="transparent"
                hide-details="auto"
              />

              <v-text-field
                v-model="form.password"
                class="login-field mb-6"
                :label="t('login.password')"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                bg-color="transparent"
                hide-details="auto"
                @click:append-inner="showPassword = !showPassword"
              />

              <v-btn
                type="submit"
                color="red-darken-1"
                size="large"
                class="login-button mb-4 mt-16"
                block
                
              >
                {{ t("login.submit") }}
              </v-btn>
              

                <v-btn
                @click="handleGuestLogin"
                color="amber-darken-1"
                size="large"
                class="login-button"
                block
                :loading="authStore.loading"
              >
                {{ t("login.guest") }}
              </v-btn>
            </v-form>
          </div>
        </section>

        <section class="image-panel">
          <div class="image-placeholder" aria-hidden="true"></div>
        </section>
      </div>
      <v-dialog v-model="showGuestDialog" max-width="450">
  <v-card rounded="xl" class="pa-4">
    
    <v-card-title class="text-h6 font-weight-bold">
      {{ t("guest.title") || "Welcome 👋" }}
    </v-card-title>

    <v-card-text>
      {{
        t("guest.message") ||
        "You entered as admin user so you can explore all features and services on the platform."
      }}
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn
        color="amber-darken-2 font-weight-bold"
        variant="flat"
        @click="() => { showGuestDialog = false; router.push('/') }"
      >
        GO AHEAD
      </v-btn>
    </v-card-actions>

  </v-card>
</v-dialog>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { AxiosError } from "axios"
import { useAuthStore } from "@/stores/authStore"
import { useLocale } from "@/composables/useLocale"

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: "",
  password: "",
})

const showPassword = ref(false)
const errorMessage = ref("")
const { t } = useLocale()
const showGuestDialog = ref(false)

const handleLogin = async () => {
  errorMessage.value = ""

  try {
    await authStore.login(form.email, form.password)
    router.push("/")
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>
    errorMessage.value = axiosError.response?.data?.message ?? t("login.error")
  }
}

const handleGuestLogin = async () => {
  errorMessage.value = ""

  try {
    await authStore.login("admin@example.com", "password123")
    showGuestDialog.value = true

  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>
    errorMessage.value = axiosError.response?.data?.message ?? t("login.error")
  }
}




</script>

<style scoped>
.login-page {
  background: #101010;
}

.login-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.login-panel {
  background: #1f1f22;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.login-content {
  width: 100%;
  max-width: 420px;
}

.brand-mark {
  color: #f3f4f6;
  font-family: "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
}

.image-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background:
    linear-gradient(rgba(10, 10, 10, 0.18), rgba(10, 10, 10, 0.18)),
    url('/pexels-pavel-danilyuk-7658190.jpg') center center / cover no-repeat;
}



.login-content :deep(.text-medium-emphasis) {
  color: rgba(226, 232, 240, 0.72) !important;
}

.login-field :deep(.v-field) {
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
}

.login-field :deep(.v-field__outline) {
  --v-field-border-opacity: 1;
  color: rgba(255, 255, 255, 0.16);
}

.login-field :deep(.v-label),
.login-field :deep(.v-field__prepend-inner),
.login-field :deep(.v-field__append-inner) {
  color: rgba(226, 232, 240, 0.72);
}

.login-field :deep(input) {
  color: #f8fafc;
}

.login-button {
  font-weight: 900;
  letter-spacing: 0.04em;
}

@media (max-width: 960px) {
  .login-shell {
    grid-template-columns: 1fr;
  }

  .image-panel {
    min-height: 320px;
  }

  .image-placeholder {
    min-height: 260px;
  }
}
</style>
