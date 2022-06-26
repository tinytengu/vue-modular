import { createApp } from "vue";

// Project
import router from "@/router";
import store from "@/store";
import App from "@/App.vue";
import { registerModules } from "@/modules";

// Modules
registerModules({});

// Init
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
