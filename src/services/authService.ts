import { http } from "@/api/http"
import { endpoints } from "@/api/endpoints"

export interface LoginPayload {
  email: string
  password: string
}

export default {
  login(payload: LoginPayload) {
    return http.post(endpoints.login, payload)
  },

  me() {
    return http.get(endpoints.me)
  },
}
