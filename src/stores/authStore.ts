import { defineStore } from "pinia"
import authService from "@/services/authService"
import { mockGuestUser } from "@/data/mockData"

const TOKEN_KEY = "auth_token"
const USER_ID = "user_id"
const AUTH_MODE_KEY = "auth_mode"
const GUEST_MODE = "guest"

interface RoleItem {
  name?: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  roles?: Array<string | RoleItem>
}

interface LoginResponse {
  user?: AuthUser | null
  token?: string | null
}

const normalizeRoles = (roles?: Array<string | RoleItem>) =>
  Array.isArray(roles)
    ? roles
        .map((role) => typeof role === "string" ? role : role.name)
        .filter((role): role is string => Boolean(role))
    : []

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) ?? "",
    user: null as AuthUser | null,
    roles: [] as string[],
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    primaryRole: (state) => state.roles[0] ?? "User",
  },

  actions: {
    setToken(token: string) {
      this.token = token

      if (token) {
        localStorage.setItem(TOKEN_KEY, token)
        return
      }

      localStorage.removeItem(TOKEN_KEY)
    },

    setAuthMode(mode: string | null) {
      if (mode) {
        localStorage.setItem(AUTH_MODE_KEY, mode)
        return
      }

      localStorage.removeItem(AUTH_MODE_KEY)
    },

    setUser(user: AuthUser | null, roles: string[] = []) {
      if (user) {
        localStorage.setItem(USER_ID, String(user.id))
      } else {
        localStorage.removeItem(USER_ID)
      }
      this.user = user
      this.roles = roles.length ? roles : normalizeRoles(user?.roles)
    },

    enterGuestMode() {
      this.setAuthMode(GUEST_MODE)
      this.setToken("guest-session")
      this.setUser(mockGuestUser, ["Guest"])
      this.initialized = true
    },

    async login(email: string, password: string) {
      this.loading = true

      try {
        const response = await authService.login({ email, password })
        const data = response.data as LoginResponse
        const token = data.token ?? ""

        this.setAuthMode(null)
        this.setToken(token)
        this.setUser(data.user ?? null)
        this.initialized = true
      } finally {
        this.loading = false
      }
    },

    async fetchCurrentUser() {
      if (localStorage.getItem(AUTH_MODE_KEY) === GUEST_MODE) {
        this.setToken(localStorage.getItem(TOKEN_KEY) ?? "guest-session")
        this.setUser(mockGuestUser, ["Guest"])
        this.initialized = true
        return
      }

      if (!this.token) {
        this.initialized = true
        return
      }

      try {
        const response = await authService.me()
        this.setUser(response.data.user ?? null, response.data.roles ?? [])
      } catch {
        this.logout()
      } finally {
        this.initialized = true
      }
    },

    logout() {
      this.setAuthMode(null)
      this.setToken("")
      this.setUser(null, [])
      this.initialized = true
    },
  },
})
