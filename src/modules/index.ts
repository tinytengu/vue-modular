// Thirdparty
import { RouteRecordRaw } from "vue-router";
import { Module } from "vuex";

// Project
import router from "@/router";
import store from "@/store";

export interface ProjectModule {
  routes?: RouteRecordRaw[];
  store?: Module<any, any>;
}

export interface ProjectModules {
  [name: string]: ProjectModule;
}

export interface ProjectStore {
  state: any;
  mutations: object;
  actions: object;
  getters: object;
}

export function registerModule(moduleName: string, module: ProjectModule) {
  if (module.routes) {
    module.routes.forEach((route) => {
      router.addRoute(route);
    });
  }

  if (module.store) {
    store.registerModule(moduleName, module.store);
  }
}

export function registerModules(modules: ProjectModules) {
  Object.keys(modules).forEach((moduleName) => {
    registerModule(moduleName, modules[moduleName]);
  });
}
