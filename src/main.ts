import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "normalize.css";
import i18n from "./i18n";
import VueParticles from 'vue-particles';
import VueAwesomeSwiper from 'vue-awesome-swiper';
//import 'swiper/css/swiper.css';
//import 'swiper/dist/css/swiper.css'
//import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
//import '../node_modules/swiper/dist/css/swiper.css'
import '../node_modules/swiper/swiper.scss'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFontAwesome, faVk, faDiscord } from '@fortawesome/free-brands-svg-icons';

console.log('%cWellcome! CreepLand 👋', 'color: cadetblue; background: aliceblue; font-size: 30px; font-family: Optima');

library.add(faUserSecret, faFontAwesome, faVk, faDiscord);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueParticles);

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
