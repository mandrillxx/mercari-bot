import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";

import { key, store } from "./store/store";

const app = createApp(App);

app.use(store, key);

app.mount("#app");
