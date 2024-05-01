import { Commit, createStore } from "vuex";

export default createStore({
  state: {
    authenticated: !!localStorage.getItem("authToken"),
    user: null,
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) =>
      (state.authenticated = auth),
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, auth: boolean) =>
      commit("SET_AUTH", auth),
  },
  modules: {},
});
