import axios from "axios"
import { endpoints, API_BASE_URL } from "@/api/endpoints"

const API_URL = API_BASE_URL

export default {
  getCategories() {
    return axios.get(API_URL + endpoints.categories)
  },
}
