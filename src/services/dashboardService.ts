import { http } from '@/api/http'
import { endpoints } from '@/api/endpoints'

export default {
  getDashboard() {
    return http.get(endpoints.dashboard)
  },
}
