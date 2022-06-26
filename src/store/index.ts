import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import persistedStorage from "@/store/cookies";

const store = createStore({
  plugins: [
    createPersistedState({
      storage: persistedStorage,
    }),
  ],
  modules: {},
});

export default store;
