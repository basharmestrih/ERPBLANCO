import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/userStore"

export function useUsers() {
  const store = useUserStore()
  const { users, userForm, roles, loading, rolesLoading, formLoading, formError } = storeToRefs(store)

  return {
    users,
    userForm,
    roles,
    loading,
    rolesLoading,
    formLoading,
    formError,
    fetchUsers: store.fetchUsers,
    fetchRoles: store.fetchRoles,
    createUser: store.createUser,
    resetForm: store.resetForm,
  }
}
