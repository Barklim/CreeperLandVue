<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CardView from "../components/CardView.vue";
import CategorieView from "../components/CategorieView.vue";
import CardManual from "../components/CardManual.vue";
import axios from "axios";

import { namespace } from 'vuex-class';
const categoryModule = namespace('CategoryModule')

@Component({
  components: {
    CardView,
    CategorieView,
    CardManual
  }
})
export default class CardViewContainer extends Vue {
  @categoryModule.State
  public categoryCurrency!: string
  @categoryModule.Mutation
  public setCurrency!: (newId: string) => void
  @categoryModule.Mutation
  public setPrefix!: (newPrefix: number) => void

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
      categoryParentId: 1,
      categoryName: 'Привелегии',
      id:1,
      type: 1,
      name: 'Дракон Края',
      image: 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg',
      actions: 0,
      cost: 0,
      description: "[b]Выживание[/b]\n- 7 точек дома\n- 7 приватов по 1 500 000 блоков\n- x2.5 множитель добычи валюты с мобов\n- 54 слота в рюкзаке\n- /workbench виртуальный верстак\n- /enderchest виртуальный эндер-сундук\n- /feed покормить себя\n- /heal исцелить себя\n- /back возврат назад (или на место смерти)\n- /ptime приватное время\n- /kit Dragon\n\n[b]Whitelist[/b]\n- Доступ\n\n[i]Навсегда![/i]"
    },
    {
      categoryParentId: 1,
      categoryName: 'Привелегии',
      id:2,
      type: 1,
      name: 'Дракон Края',
      image: 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg',
      actions: 0,
      cost: 0,
      description: '<strong>Выживание</strong><br>- 7 точек дома<br>- 7 приватов по 1 500 000 блоков<br>- x2.5 множитель добычи валюты с мобов<br>- 54 слота в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /back возврат назад (или на место смерти)<br>- /ptime приватное время<br>- /kit Dragon<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>'
    },
    {
      categoryParentId: 1,
      categoryName: 'Привелегии',
      id:3,
      type: 1,
      name: 'Дракон Края',
      image: 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg',
      actions: 0,
      cost: 0,
      description: '<strong>Выживание</strong><br>- 7 точек дома<br>- 7 приватов по 1 500 000 блоков<br>- x2.5 множитель добычи валюты с мобов<br>- 54 слота в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /back возврат назад (или на место смерти)<br>- /ptime приватное время<br>- /kit Dragon<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>'
    }
  ]

  toggleCurrency(event) {
    const element = event.currentTarget;
    const currencyInnerHTML = element.innerHTML;
    const prefixAttr = element.getAttribute('prefix');
    this.setCurrency(currencyInnerHTML);
    this.setPrefix(prefixAttr);
    console.log('TEST 123');
    console.log(prefixAttr);
  }

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

        // ForeEach don't work here, why?
        for (let i = 0; i < dataCategorie.length; i++) {
          this.categoriesbuttons.push(dataCategorie[i])
        }

         // Let's push cards:
        const newCards = [];
        for (let i = 0; i < curDataCat.categories.length; i++) {

          const curCategoryName = curDataCat.categories[i].name;
          const categoryParentId = curDataCat.categories[i].id;
          const curItems = curDataCat.categories[i].items;

          for (let j = 0; j < curItems.length; j++) {
            const cardObj = curItems[j];
            cardObj.categoryName = curCategoryName;
            cardObj.categoryParentId = categoryParentId;
            newCards.push(cardObj);
          }
        }

        newCards.length !== 0 ? this.cards = newCards : null;
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
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
          <span class="current-value">{{this.categoryCurrency}}</span>
          <span class="options">
            <span v-on:click="toggleCurrency" prefix="RUB" onclick="shop.currency.set('RUB')">🇷🇺 Российский рубль</span>
            <span v-on:click="toggleCurrency" prefix="UAH" onclick="shop.currency.set('UAH')">🇺🇦 Украинская гривна</span>
            <span v-on:click="toggleCurrency" prefix="BYN" onclick="shop.currency.set('BYN')">🇧🇾 Белорусский рубль</span>
            <span v-on:click="toggleCurrency" prefix="KZT" onclick="shop.currency.set('KZT')">🇰🇿 Казахстанский тенге</span>
            <span v-on:click="toggleCurrency" prefix="USD" onclick="shop.currency.set('USD')">🇺🇸 Доллар США</span>
            <span v-on:click="toggleCurrency" prefix="EUR" onclick="shop.currency.set('EUR')">🇪🇺 Евро</span></span>
          </span>
        </span>
      </h2>

    <!-- ---------- Categories ---------- -->
    <div v-if="categoriesbuttons" id="categoriesItems" class="">
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
    <CardManual></CardManual>

    </div>
  </div>

</template>

<style lang="scss" scoped>

/* ---------- Cards ---------- */

#categoriesItems {
  text-align: left;
  margin-bottom: 30px;
}
.cards {
    margin-left: -20px;
    margin-top: -20px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}


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
    cursor: pointer;
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
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60%;
    z-index: -1;
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
    padding-bottom: 20px;
    display: inline-block;
    display: unset;
}

</style>