const HOME_VIEW_TEMPLATE = `<script setup lang="ts"></script>\n
<template>
  <h1>{moduleCap} Home</h1>
</template>\n
<style lang="scss" scoped></style>\n`;

const MODULE_WRAPPER_VIEW_TEMPLATE = `<template>
  <div>
    <router-view />
  </div>
</template>\n`;

const ROUTES_TEMPLATE = `import { RouteRecordRaw } from "vue-router";\n
const Module = () => import("./views/ModuleWrapper.vue");
const Home = () => import("./views/Home.vue");\n
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "{module}.root",
    component: Module,
    children: [
      {
        path: "",
        name: "{module}.home",
        component: Home,
      },
    ],
  },
];\n
export default routes;\n`;

const STORE_TEMPLATE = `import { Module } from "vuex";\n
const store: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      {state}State: 123,
    };
  },
  mutations: {
    set{stateCap}State(state, value: number) {
      state.{state}State = value;
    },
  },
  actions: {
    set{stateCap}State(context, value: number) {
      context.commit("set{stateCap}State", value);
    },
  },
  getters: {},
};\n
export default store;\n`;

const INDEX_TEMPLATE = `import { ProjectModule } from "@/modules";{routesImport}{storeImport}\n
const module: ProjectModule = {{routesExport}{storeExport}
};\n
export default module;
`;

module.exports = {
  HOME_VIEW_TEMPLATE,
  MODULE_WRAPPER_VIEW_TEMPLATE,
  ROUTES_TEMPLATE,
  STORE_TEMPLATE,
  INDEX_TEMPLATE,
};
