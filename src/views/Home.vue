<template>
  <div class="home">
    <main class="main">

      <div>Online creepland Block</div>

        <div class="module-items gray-area">
          <div class="wrapper">
            <h2>
              Донат 
              <span class="sub-text pseudo-opacity">Валюта: 
                <span class="dropdown link" data-default-value="" data-placeholder="Выберите валюту" data-action="shop.currency.set">
                <span class="current-value">🇷🇺 Российский рубль</span><span class="options"><span onclick="shop.currency.set('RUB')">
                  🇷🇺 Российский рубль
                </span>
                <span onclick="shop.currency.set('UAH')">🇺🇦 Украинская гривна</span>
                <span onclick="shop.currency.set('BYN')">🇧🇾 Белорусский рубль</span>
                <span onclick="shop.currency.set('KZT')">🇰🇿 Казахстанский тенге</span>
                <span onclick="shop.currency.set('USD')">🇺🇸 Доллар США</span>
                <span onclick="shop.currency.set('EUR')">🇪🇺 Евро</span></span></span>
              </span>
          </h2>

            <!-- ---------- Cards ---------- -->
            <div v-if="cards">
              <CardView 
                v-for="cardItem in cards"
                v-bind:key="cardItem.id" 
                :cardItem="cardItem"
              ></CardView>
            </div>
            <div v-else>
              Пока здесь пусто :(
            </div>

          </div>
        </div>

      <div>Инструкция по покупке Block</div>
      <div>Последние покупки Block</div>

    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CardView from "../components/CardView.vue";

@Component({
  components: {
    CardView
  }
})
export default class Home extends Vue {
  cards = [
    {
      id:1, 
      category: 'Привелегии',
      title: 'Дракон Края',
      image: 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg',
      actions: 0,
      cost: 0,
      description: '<strong>Выживание</strong><br>- 7 точек дома<br>- 7 приватов по 1 500 000 блоков<br>- x2.5 множитель добычи валюты с мобов<br>- 54 слота в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /back возврат назад (или на место смерти)<br>- /ptime приватное время<br>- /kit Dragon<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>'
    },
    {
      id:2, 
      category: 'Привелегии',
      title: 'Дракон Края',
      image: 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg',
      actions: 0,
      cost: 0,
      description: '<strong>Выживание</strong><br>- 7 точек дома<br>- 7 приватов по 1 500 000 блоков<br>- x2.5 множитель добычи валюты с мобов<br>- 54 слота в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /back возврат назад (или на место смерти)<br>- /ptime приватное время<br>- /kit Dragon<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>'
    },
    {
      id:3, 
      category: 'Привелегии',
      title: 'Дракон Края',
      image: 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg',
      actions: 0,
      cost: 0,
      description: '<strong>Выживание</strong><br>- 7 точек дома<br>- 7 приватов по 1 500 000 блоков<br>- x2.5 множитель добычи валюты с мобов<br>- 54 слота в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /back возврат назад (или на место смерти)<br>- /ptime приватное время<br>- /kit Dragon<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>'
    }
  ]
}
</script>

<style lang="scss" scoped>

.articles-control {
  .el-input {
    display: inline-block;
    width: 250px;
    margin: 0 5px 0 0;
    @media (max-width: 768px) {
      display: block;
      width: 100%;
      margin: 0 0 10px 0;
    }
  }
}
.block-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

/* ---------- Cards ---------- */

.gray-area {
    background: #f8f9fa;
}
.wrapper {
    max-width: 980px;
    margin: 0 auto;
    padding: 80px 20px;
    box-sizing: border-box;
}

h2:not(.enable-padding):first-child {
    padding-top: 0;
}
h2 {
    font-size: 32px;
    font-weight: 900;
    margin: 0;
    padding-bottom: 40px;
    padding-top: 80px;
    line-height: 1;
    /* */
    text-align: initial;
    color: rgb(51, 51, 51);
}
h2>span {
    margin-top: 10px;
    line-height: 1;
}
.sub-text {
    opacity: .3;
    text-transform: uppercase;
    font-size: 11.7px;
    font-weight: 700;
    line-height: 120%;
    display: block;
}
.sub-text.pseudo-opacity {
    opacity: 1;
    color: #bbbcbd;
}
span.current-value {
    color: #21ba45;  
}
.dropdown .options {
    text-transform: none;
    display: none;
    position: absolute;
    z-index: 15;
    background: #fff;
    padding: 3px 0;
    color: #333;
    top: calc(100% + 10px);
    left: -20px;
    cursor: default;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: normal;
    min-width: 200px;
    -wekbit-box-shadow: 0 27px 85px -5px rgba(0,0,0,.15);
    box-shadow: 0 27px 85px -5px rgba(0,0,0,.15);
    border-radius: 3px;
}
.dropdown .options span {
    display: block;
    white-space: nowrap;
    padding: 12px 20px;
    line-height: 1;
    color: inherit;
    text-decoration: none;
}

</style>
