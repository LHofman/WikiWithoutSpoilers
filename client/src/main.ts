import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createPinia } from "pinia";
import PiniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createApolloProvider } from '@vue/apollo-option'

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

app.mount("#app");
