import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./main.scss";
import DevTool from "@wuxudongxd/todolist-devtool";

DevTool("http://localhost:3001");

createApp(App).use(createPinia()).mount("#app");
