
<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.dashboard" />
    <div v-else>
      <v-row class="align-center justify-space-between mb-4">
        <v-col
          cols="12"
          class="d-flex align-center justify-space-between flex-wrap"
        >

        </v-col>
      </v-row>
      <div class="flex flex-col">

      <v-row class="mb-4">
        <v-col
          v-for="stat in dashboardStats"
          :key="stat.title"
          cols="12"
          sm="6"
          md="3"
        >
          <DashboardStats
            :title="stat.title"
            :value="stat.value"
            :icon="stat.icon"
            :subtitle="stat.subtitle"
          />
        </v-col>
      </v-row>
                <v-btn
            size="small"
            variant="tonal"
            color="primary"
            class="mb-4"
            :loading="refreshing"
            prepend-icon="mdi-refresh"
            @click="refreshDashboard"
          >
            {{ t("dashboard.refresh") }}
          </v-btn>
          </div>

      <v-row>
        <v-col cols="12" md="6">
          <DashboardCard
            :title="t('dashboard.ordersCardTitle')"
            :subtitle="t('dashboard.ordersCardSubtitle')"
            img-src="https://images.pexels.com/photos/6169133/pexels-photo-6169133.jpeg"
            color="#952175"
            nav-icon="mdi-trending-up"
            to="/orders"
          />
        </v-col>

        <v-col cols="12" md="6">
          <DashboardCard
            :title="t('dashboard.stockMovementsCardTitle')"
            :subtitle="t('dashboard.stockMovementsCardSubtitle')"
            img-src="https://images.pexels.com/photos/6169643/pexels-photo-6169643.jpeg"
            color="#00897b"
            nav-icon="mdi-database"
            to="/stock-movement"
          />
        </v-col>

        <v-col cols="12" md="6">
          <DashboardCard
            :title="t('dashboard.invoicesCardTitle')"
            :subtitle="t('dashboard.invoicesCardSubtitle')"
            img-src="https://images.pexels.com/photos/6928880/pexels-photo-6928880.jpeg"
            color="#ef6c00"
            nav-icon="mdi-file-document"
            to="/invoices"
          />
        </v-col>

        <v-col cols="12" md="6">
          <DashboardCard
            :title="t('dashboard.customersCardTitle')"
            :subtitle="t('dashboard.customersCardSubtitle')"
            img-src="https://images.pexels.com/photos/13735971/pexels-photo-13735971.jpeg"
            color="#d32f2f"
            nav-icon="mdi-account-group"
            to="/customers"
          />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import DashboardCard from "@/components/dashboard/DashboardCard.vue"
import DashboardStats from "@/components/dashboard/DashboardStats.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { useDashboard } from "@/composables/useDashboard"

const { dashboardStats, loading, refreshing, refreshDashboard, t } = useDashboard()
</script>
