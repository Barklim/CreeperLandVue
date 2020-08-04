<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class HeaderComponent extends Vue {
  activeIndex: string = "1";
  menuIsActive: boolean = false;
  active: boolean = false;
  visible: boolean = false;

  lang: string = "en";
  logout() {
    window.localStorage.clear();
    this.$router.push("Login");
  }
  menuNav() {
    this.menuIsActive = !this.menuIsActive;
  }
  switchLang() {
    this.$i18n.locale = this.lang;
  }

  scrollTo() {
    //console.log(document.getElementById('donat').scrollIntoView());
    document.getElementById('donat').scrollIntoView()
  }
}
</script>

<template>
  <div class="zone-header">
    <header class="header">
      <div class="cover darkness headerImg">
        <div class="cover__effect">
          <div id="particles-js">
            <canvas class="particles-js-canvas-el" width="1282" height="507" style="width: 100%; height: 100%;"></canvas>
          </div>
        </div>
      </div>
      <div class="content center bottom">
        <div class="content__block">
          <div class="server-info module-monitoring"></div>
          <h1 class="">Creeper Land</h1>
          <div class="description">Твой ламповый Minecraft сервер</div>
          <div class="actions">
            <div class="button themed-button scroll-to-main" 
            @click="scrollTo"
            >
            Перейти к товарам
            </div>
          </div>
        </div>
      </div>
    </header>
    <nav class="menu type-1" role="navigation" :class="{ visible }">
      <a class="logo hidden uppercase" href="/">Creeper Land</a>
      <div class="links">
        <a href="/votes" target="_self">Ссылки на мониторинги</a>
      </div>
    </nav>
      <div class="particlesVue">
        <vue-particles
        color="#dedede"
        :particleOpacity="1.0"
        :particlesNumber="800"
        shapeType="circle"
        :particleSize="3"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="false"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <div class="open-menu" :class="{ active }" id="toggle" @click="active = !active;visible = !visible"></div>
  </div>
</template>

<style lang="scss" scoped>

#app {
  font-size: 13px;
  color: #333;
  background: #111;
  overflow-x: hidden;
  width: 100%;
  line-height: 150%;
  font-family: Roboto,Emoji,sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
}
.zones, .zones, .zone-header {
  position: relative;
}

/* ---------- Particles ---------- */

.particlesVue {
  position: absolute;
  top: 0;
  height: 406px;
}

/* ---------- HeaderImage ---------- */

.header {
  height: auto;
  /* height: 100vh; */
  height: 50vh;
}
header .cover {
  /* background: url(../images/default_bg.jpg) no-repeat 50%; */
  background-image: url(./../../assets/img/headerComp.jpg) no-repeat 50%;
  background-size: cover;
  overflow: hidden;
  position: absolute;
}
header .content, 
header .cover {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* ! */
  /* height: 60%; */
  height: 406px
}
header .cover:after {
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background: #000;
  opacity: .6;
}

.headerImg {
  background: url(./../../assets/img/headerComp.jpg) no-repeat 50%;
  /* background-image: url(./../../assets/img/headerComp.jpg); */
}

header .cover__effect, header .cover__effect>div {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* ---------- Text ---------- */

header .content.bottom {
  -ms-flex-align: end;
  align-items: flex-end;
}
header .content.center {
  text-align: center;
}
header .content {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  height: inherit;
}
.zones.template_compact .zone-header header .content__block {
  argin: 100px 0 40px!important;
}
.zone-header {
  margin: 0 0 46px!important;
}
@media screen and (min-width: 960px) {
  .zones.template_compact .zone-header header .content__block, .zones.template_default .zone-header header .content__block, .zones.template_fit .zone-header header .content__block {
      max-width: 80%;
  }
}
header .content__block {
  width: 100%;
  max-width: 960px;
  color: #fff;
  padding: 20px;
}

header .content__block .server-info {
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 60px;
  letter-spacing: 2.5px;
  font-weight: 700;
  line-height: 1.2;
}
header .content__block h1 {
  font-weight: 700;
  font-size: 38px;
  line-height: 1.07;
  letter-spacing: .5px;
  margin: 0;
  text-transform: uppercase;
}
header .content__block h1 {
  word-wrap: break-word;
  word-break: normal;
  word-break: break-word;
}
header .content__block .description {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.2;
  opacity: .9;
  font-weight: 300;
}

header .content__block .actions {
  margin-top: 60px;
}

/* ---------- Button ---------- */

body.buttons-default.green-buttons, .themed-button {
  background: #21ba45;
  background: linear-gradient(90deg,#32cb56 0,#007601);
  background-size: 200% 1px;
  -wekbit-box-shadow: 0 5px 17px rgba(0,83,20,.4);
  box-shadow: 0 5px 17px rgba(0,83,20,.4);
}
body.buttons-default .button.flat, body.buttons-default .button.themed-button, body.buttons-outline .button.flat, body.buttons-outline .button.themed-button, body.buttons-scratch .button.flat, body.buttons-scratch .button.themed-button, body.buttons-underline .button.flat, body.buttons-underline, .button.themed-button {
  border-radius: 25px;
}
.button {
  display: inline-block;
  color: #fff;
  text-align: center;
  cursor: pointer;
  padding: 14px 24px;
  text-decoration: none!important;
  font-weight: 700;
  border: 0;
  outline: 0;
  vertical-align: top;
  line-height: 1;
  text-transform: uppercase;
  font-size: 90%;
  position: relative;
  white-space: nowrap;
  transition: all .1s ease;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  font-size: 12px;
  font-family: Roboto, sans-serif;
}
body.buttons-default.green-buttons:hover,
.themed-button:hover {
  background-position: 50%;
  /* background: linear-gradient(90deg,#32cb56 0,#007601); */
  background: linear-gradient(90deg, #21ba45 0, #007601);
  /* background-size: 200% 1px; */
  /* -wekbit-box-shadow: 0 5px 17px rgba(0,83,20,.4); */
  box-shadow: 0 5px 17px rgba(0,83,20,.4);
}

/* ---------- Nav ---------- */

@media screen and (min-width: 740px) {
  .zones .zone-header header+nav {
      position: absolute;
  }
}
@media screen and (min-width: 740px) {
  .zones .zone-header nav {
      position: relative;
  }
}
@media screen and (min-width: 740px) {
nav.menu.type-1 {
    position: absolute;
    bottom: auto;
    right: 0;
    width: auto;
    padding: 20px;
    background: none;
    overflow: visible;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    /* align-items: center; */
    transform: translate(0);
  }
}
nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  z-index: 10;
  padding-top: 80px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: rgba(0,0,0,.8);
  color: #fff;
  transform: translate(-100%);
  transition: transform .1s linear;
}
@media screen and (min-width: 740px) {
  .zones:not(.template_tape) nav.type-1 a.logo {
      margin: 0;
  }
}
nav.visible {
    transform: translate(0);
}
nav:after {
    content: "";
    height: 80px;
    display: block;
}

a.logo.hidden {
  display: none;
}
a.logo {
  font-size: 170%!important;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 20px;
  white-space: nowrap;
  line-height: 1;
  color: #fff!important;
  text-transform: uppercase;
}
nav a {
  color: inherit!important;
  display: block;
  text-decoration: none!important;
  padding: 10px 20px;
}

@media screen and (min-width: 740px) {
nav.type-1 .links {
    margin-left: auto;
    padding-left: 20px;
    text-align: right;
  }
}
@media screen and (min-width: 740px) {
  .zones:not(.template_tape) nav .links {
    margin-top: 0;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
}

@media screen and (min-width: 740px) {
  .zones:not(.template_tape) nav .links a {
    border-radius: 3px;
  }
}
.links a:hover {
    background: hsla(0,0%,100%,.05);
}

nav .links a {
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  overflow: hidden;

  font-size:13px;
  text-align: initial;
}

.zones .zone-header header~.open-menu {
  position: absolute;
}
.open-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  z-index: 15;
  cursor: pointer;
  transition: left .1s linear;
  border-radius: 3px;
}
.open-menu:after, 
.open-menu:before {
  content: "";
  display: block;
  width: 24px;
  margin-left: -12px;
  left: 50%;
  top: 50%;
  position: absolute;
  transition: all .1s ease;
}
.open-menu:before {
  background: #fff;
  height: 2px;
  margin-top: -1px;
}
.open-menu:after {
  border: solid #fff;
  border-width: 2px 0;
  /* height: 16px; */
  height: 12px;
  margin-top: -8px;
}
body *, body :after, body :before {
  box-sizing: inherit;
}
body ::-webkit-scrollbar-thumb {
  height: 6px;
  border: 4px solid transparent;
  background-clip: padding-box;
  -webkit-border-radius: 7px;
  background-color: rgba(0,0,0,.2);
  transition: all .1s ease;
}
.open-menu.active:before {
  transform: rotate(-45deg);
}
.open-menu.active:after {
  height: 2px;
  border: 0;
  background: #fff;
  margin-top: -1px;
  transform: rotate(45deg);
}
@media screen and (min-width: 740px) {
  .open-menu {
    display: none;
  }
}

</style>
