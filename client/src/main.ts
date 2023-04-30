import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import BootstrapVue3 from 'bootstrap-vue-3'
import { createPinia } from "pinia";
import PiniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createApolloProvider } from '@vue/apollo-option'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from "./App.vue";

import "./assets/main.css";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
pinia.use(PiniaPluginPersistedState);
app.use(pinia);

app.use(router);

const apolloProvider = createApolloProvider({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  }),
});
app.use(apolloProvider);

app.use(BootstrapVue3);

app.mount("#app");
