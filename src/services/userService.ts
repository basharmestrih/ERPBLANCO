import { http } from "@/api/http"
import { endpoints } from "@/api/endpoints"
import type { UserFormInput } from "@/types/user"

export default {
  getUsers() {
    return http.get(endpoints.users)
  },

  getRoles() {
    return http.get(endpoints.roles)
  },

  createUser(payload: UserFormInput) {
    return http.post(endpoints.register, payload)
  },
}
