<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CardView from "../components/CardView.vue";
import CategorieView from "../components/CategorieView.vue";
import axios from "axios";

@Component({
  components: {
    CardView,
    CategorieView
  }
})
export default class CardViewContainer extends Vue {
  dataCat = {};

  show: string = '';

  categoriesbuttons = [ 
    {
      id: 1,
      name: "Все товары"
    }
  ]

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

  mounted() {
    
    axios
      .get("https://api.trademc.org/shop.getItems?shop=129168&v=3")
      .then(response => {

        this.dataCat = response.data.response;

        const curDataCat = this.dataCat

        const dataCategorie = curDataCat.categories.map(function(item) {
          return { 
            id: item.id,
            name: item.name
          };
        });

        // foreEach don't work here, why?
        for (let i = 0; i < dataCategorie.length; i++) {

           this.categoriesbuttons.push(dataCategorie[i])
        }

      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  }

}
</script>

<template>
  <div class="module-items gray-area" id="donat">
    <div class="wrapper">
      <h2>
        Донат 
        <span class="sub-text pseudo-opacity">Валюта: 
          <span 
            class="dropdown link" 
            data-default-value="" 
            data-placeholder="Выберите валюту" 
            data-action="shop.currency.set"
            @mouseenter="show = !show"
            @mouseleave="show = !show"
            :class="{ show }"
          >
            <span class="current-value">🇷🇺 Российский рубль</span><span class="options"><span onclick="shop.currency.set('RUB')">
              🇷🇺 Российский рубль
            </span>
            <span onclick="shop.currency.set('UAH')">🇺🇦 Украинская гривна</span>
            <span onclick="shop.currency.set('BYN')">🇧🇾 Белорусский рубль</span>
            <span onclick="shop.currency.set('KZT')">🇰🇿 Казахстанский тенге</span>
            <span onclick="shop.currency.set('USD')">🇺🇸 Доллар США</span>
            <span onclick="shop.currency.set('EUR')">🇪🇺 Евро</span></span>
          </span>
        </span>
    </h2>


    <!-- ---------- Categories ---------- -->
    <div v-if="categoriesbuttons" id="categoriesItems" class="cards inner">
      <CategorieView
        v-for="categorieItem in categoriesbuttons"
        v-bind:key="categorieItem.id" 
        :categorieItem="categorieItem"
      ></CategorieView>
    </div>
    <div v-else>
      <div>Все категории...</div>
    </div>


    <!-- ---------- Cards ---------- -->
    <div v-if="cards" id="items" class="cards inner">
      <CardView 
        v-for="cardItem in cards"
        v-bind:key="cardItem.id" 
        :cardItem="cardItem"
      ></CardView>
    </div>
    <div v-else>
      Пока здесь пусто :(
    </div>

    <!-- ---------- Manual ---------- -->
    <div class="module-manual">
      <h2 class="enable-padding">Инструкция по покупке</h2>
      <div class="manual clear-fix">
        <div class="content">
          <strong>1. Выбор товара</strong>
          <br>
          Добавьте необходимые товары в корзину и заполните предлагаемую форму.
          <br>
          <br>
          <strong>2. Способ оплаты</strong>
          <br>
          Выберите предпочитаемый способ оплаты и следуйте дальнейшим инструкциям.
          <br>
          <br>
          <strong>3. Активация привилегии</strong>
          <br>
          Товар выдается после оплаты в автоматическом режиме и моментально.
        </div>
      </div>
    </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>

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
    /*font-size: 32px;*/
    font-size: 28px;
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
    /*position: relative;*/
    /*width: 80px;*/
    /*left: 42px;*/
    margin-left: 40px;

    z-index: 15;
    background: #fff;
    padding: 3px 0;
    color: #333;
    /* top: calc(100% + 10px); */
    /* left: -20px; */
    /*left: 68px;*/
    top: 106%;
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

.dropdown .options {
  &:after {
    content:"";
    position:absolute;
    width:0;
    height:0;
    border-style:solid;
    border-width:0 6px 6px;
    border-color:transparent transparent #fff;
    top:-6px;
    left:36px;
    /*left: 80px;*/
  }
}
.dropdown .options {
  &:before {
    content:"";
    display:block;
    height:10px;
    position:absolute;
    top:-10px;
    width:100%
  }
}

.dropdown.show .options {
  display: block;
  
  -webkit-animation: fadein 1s cubic-bezier(0, 1.15, 0.2, 1) alternate 1;
  -moz-animation: fadein 1s cubic-bezier(0, 1.15, 0.2, 1) alternate 1;
  animation: fadein 1s cubic-bezier(0, 1.15, 0.2, 1) alternate 1;
}
@-webkit-keyframes fadein {
    from { opacity: 0; top: 108%}
    to { opacity: 1; top: 106% }
}
@-moz-keyframes fadein {
    from { opacity: 0; top: 108% }
    to { opacity: 1; top: 106%}
}
@keyframes fadein {
    from { opacity: 0; top: 108% }
    to { opacity: 1; top: 106% }
}
/*
.dropdown.show .options {
  display: block;
  margin-top: -20px !important;
}
*/

span.current-value {
  &:hover {
    text-decoration: underline;
  }
}
.options span {
  &:hover {
    background: #f8f9fa;
  }
}

span.current-value {
    padding-bottom: 10px;
    display: inline-block;
}

/* ---------- Manual ---------- */

.manual.clear-fix {
  text-align: initial;
  font-size: 13px;
  line-height: 19.5px;
}
clear-fix {
  &:after {
    content: "";
    display: block;
    clear: both;
  }
}

</style>