import axios from "axios"
import { endpoints, API_BASE_URL } from "@/api/endpoints"

const API_URL = API_BASE_URL

export default {
  getProducts() {
    return axios.get(API_URL + endpoints.products)
  },
  createProduct(payload: any) {
    // add user token to request headers
    console.log(localStorage.getItem("auth_token"))
    return axios.post(API_URL + endpoints.products, payload,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
  },
}
