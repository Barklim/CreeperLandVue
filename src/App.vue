<template>
  <div id="app">
    <div class="noindex">
      <ModalComponent></ModalComponent>
      <FixedVk></FixedVk>
      <FixedCart></FixedCart>
    </div>
    <HeaderComponent
      v-if="$route.name != 'Login' && $route.name != '404'"
    ></HeaderComponent>
    <el-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-main>
    <FooterComponent
      v-if="$route.name != 'Login' && $route.name != '404'"
    ></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "./components/layout/HeaderComponent";
import FooterComponent from "./components/layout/FooterComponent";
import FixedVk from "./components/noIndex/FixedVk";
import FixedCart from "./components/noIndex/FixedCart";
import ModalComponent from "./components/noIndex/Modal";

import "@/assets/style/global.scss";

export default {
  name: "app",
  components: {
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    FixedVk,
    FixedCart
  }
};
</script>

<style>
.el-main {
  overflow: hidden;
}
/* redefine */
.el-main {
  /* padding-left: 0 !important; */
  /* padding-right: 0 !important; */
  padding: 0 !important;
}

.fade-enter-active {
  animation: slidePageIn 1s forwards;
  animation-timing-function: cubic-bezier(0.8, -0.49, 0.36, 1);
}

.fade-leave-active {
  animation: slidePageDown 1s forwards;
  animation-timing-function: cubic-bezier(0.8, -0.49, 0.36, 1);
}

@keyframes slidePageIn {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes slidePageDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
    transform: translateY(100%);
  }
}
</style>
