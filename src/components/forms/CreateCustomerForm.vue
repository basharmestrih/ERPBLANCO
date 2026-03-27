<template>
  <v-form>
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h3 class="text-subtitle-1 font-weight-bold">Add New Customer</h3>
        <p class="text-caption text-grey">Capture contact details before creating orders and invoices.</p>
      </div>
    </div>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="customerForm.name"
          label="Customer Name"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="customerForm.phone"
          label="Phone"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="customerForm.email"
          label="Email"
          type="email"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="customerForm.password"
          label="Password"
          type="password"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="customerForm.company"
          label="Company"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="customerForm.status"
          :items="statusOptions"
          label="Status"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="customerForm.address"
          label="Address"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-textarea
          v-model="customerForm.notes"
          label="Notes"
          variant="outlined"
          density="compact"
          hide-details
          rows="3"
          auto-grow
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { useCustomers } from "@/composables/useCustomers"

const { customerForm } = useCustomers()

const statusOptions = ["active", "inactive"]
</script>
