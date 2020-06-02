import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueAnalytics from 'vue-analytics';
//import VueTableDynamic from 'vue-table-dynamic';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
Vue.use(VueAnalytics, {
  id: 'UA-168220041-1'
});

new Vue({
  render: h => h(App),
}).$mount('#app');
