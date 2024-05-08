import { Commit, createStore } from "vuex";

export default createStore({
  state: {
    authenticated: !!localStorage.getItem("authToken"),
    user: null,
    isAdmin: null,
    isToast: false,
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    isAdmin: (state) => state.isAdmin,
    isToast: (state) => state.isToast,
  },
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) =>
      (state.authenticated = auth),
    setUser(state, user) {
      state.user = user;
    },
    SET_ADMIN: (state: { isAdmin: boolean | null }, isAdmin: boolean | null) =>
      (state.isAdmin = isAdmin),
    SET_TOAST: (
      state: { isToast: boolean },
      isToast: boolean //
    ) => (state.isToast = isToast),
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, auth: boolean) =>
      commit("SET_AUTH", auth),
    setAdmin: ({ commit }: { commit: Commit }, isAdmin: boolean | null) =>
      commit("SET_ADMIN", isAdmin),
    setToast: (
      { commit }: { commit: Commit },
      isToast: boolean //
    ) => commit("SET_TOAST", isToast),
  },
  modules: {},
});
