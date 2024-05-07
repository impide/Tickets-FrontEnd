import { Commit, createStore } from "vuex";

export default createStore({
  state: {
    authenticated: !!localStorage.getItem("authToken"),
    user: null,
    isAdmin: null,
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    isAdmin: (state) => state.isAdmin,
  },
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) =>
      (state.authenticated = auth),
    setUser(state, user) {
      state.user = user;
    },
    SET_ADMIN: (state: { isAdmin: boolean | null }, isAdmin: boolean | null) =>
      (state.isAdmin = isAdmin),
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, auth: boolean) =>
      commit("SET_AUTH", auth),
    setAdmin: ({ commit }: { commit: Commit }, isAdmin: boolean | null) =>
      commit("SET_ADMIN", isAdmin),
  },
  modules: {},
});
