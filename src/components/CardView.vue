<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

import { CardItem } from "../types";
import { getById } from "../utils";

import { namespace } from 'vuex-class';
const categoryModule = namespace('CategoryModule');
const modal = namespace('Modal');
const cart = namespace('Cart');

// Utils func:
const toFixedFilter = function(value) {
  // return '$' + value.toFixed(2)
  return value.toFixed(2)
}

@Component({
  filters: {
    test(value, value1) {
      const newValue = value/2;
      const toFixedNumber = toFixedFilter(newValue)
      return toFixedNumber;
    }
  }
})
export default class CardView extends Vue {
	@Prop() cardItem?: CardItem;
  errored: boolean = false;
  private isShow: boolean = false;
  private displayNone1: string = "";
  private zoomIn: string = "zoomIn";
  private zoomOut: string = "";

  @categoryModule.State
  public prefix!: string
  @categoryModule.State
  public categoryId!: number
  @modal.Mutation
  public setCardItem!: (newCardItem) => void
  @modal.Mutation
  public setModal!: (newState: boolean) => void
  @modal.Mutation
  public setIsInBasket!: (newState: boolean) => void

  @cart.State
  public cartArr

	truncate (str: string, n: number) {	
		// for truncate description 
	}	
	openModal(id: string, cardItem: any) {
		// this open Modal
		// @click=openModal(cardItem.id, cardItem)
	}
  toFixed(value) {
    return value.toFixed(2)
  }
  isSale(saleObj: any) {

    let oldCost = '';
    let percent = '';
    let isSale = false;

    if((typeof saleObj === "object" || typeof saleObj === 'function') && (saleObj !== null)) {
      oldCost = saleObj.old_cost;
      percent = saleObj.percent;
      isSale = true;
    }

    return isSale;
  }
  formattedCur(cost: number) { 

    let nFormat;
    let convertCost;
    let postFix;

    // TODO: Need currency Api
    switch (this.prefix) {
      case "RUB":
        nFormat = "ru-RU";
        convertCost = cost;
        postFix = "₽";
         // postFix = "";
        break;
      case "UAH":
        nFormat = "ru-RU";
        convertCost = cost/2.66;
        // convertCost = cost/2.7;
        postFix = "₴";
        break;
      case "BYN":
        nFormat = "ru-RU";
        convertCost = cost/30;
        postFix = "Br";
        break;
      case "KZT":
        nFormat = "ru-RU";
        convertCost = cost/0.175;
        // convertCost = cost/0.17;
        postFix = "₸";
        break;
      case "USD":
        nFormat = "en-EN";
        convertCost = cost/73.64;
        // convertCost = cost/73.6;
        postFix = "$";
        break;
      case "EUR":
        nFormat = "de-DE";
        convertCost = cost/87.18;
        // convertCost = cost/87.2;
        postFix = "€";
        break;
      default:
        nFormat = "ru-RU";
        convertCost = cost;
        postFix = "₽";
    }

    //const formattedCost = new Intl.NumberFormat(nFormat, { style: 'currency', currency: this.prefix }).format(convertCost)
    //const formattedCost = this.toFixed(convertCost);
    //const formattedCost = convertCost.toLocaleString('ru-RU') + " " + postFix;
    const formattedCost = new Intl.NumberFormat(nFormat, 
      {
        style:'decimal',
        currency: this.prefix,minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(convertCost) + " " + postFix;

    return formattedCost;
  }
  zoomIn1() {
    this.displayNone1 = "";
  }
  zoomOut1() {
    this.displayNone1 = "displayNone";
  }
  displayNone() {

    // Need for updated lifecycle
    if(this.categoryId === 1) {
      // this.isShow = "";
    }

    return "";
  }
  hasItemInBasket() {

    // console.log('TEST 1234')
    // console.log(this.cartArr)
    // console.log(this.cardItem)
    // console.log(getById(this.cartArr, this.cardItem.id))

    this.setIsInBasket(!!getById(this.cartArr, this.cardItem.id))
  }

  updated() {

    if (this.categoryId === 1) {
      this.zoomIn = "zoomIn";
      this.zoomOut = "";
      this.displayNone1 = '';
    }

    if (this.categoryId === this.cardItem.categoryParentId) {
      this.zoomIn = "zoomIn";
      this.zoomOut = "";
      setTimeout(this.zoomIn1, 350);
    } else {
      if (this.categoryId !== 1) {
        this.zoomIn = "";
        this.zoomOut = "zoomOut";
        setTimeout(this.zoomOut1, 350);
      }
    }
  }
}
</script>

<template>
	<div class="">

    <div 
      class="card animate"
      v-bind:class="[this.displayNone(), displayNone1, zoomIn, zoomOut]"
    >
      <div class="image" :style="{ backgroundImage: `url('${cardItem.image}')` }">
    	</div>
    	<div 
        class="description"
        @click="setModal(true); setCardItem(cardItem); hasItemInBasket()"
      >
        <div class="sale" v-if="isSale(cardItem.sale)">
          <div class="sale__size">-20%</div>
        </div>
        <div v-else></div>
    		<div class="sub-text">
    			<font-awesome-icon class="tags icon" icon="tag" />
          {{cardItem.categoryName}}
    		</div>
    		<div class="name">{{cardItem.name}}</div>
    		<div class="cost">
          {{formattedCur(cardItem.cost)}}
          <span class="old-cost" v-if="isSale(cardItem.sale)">
            {{formattedCur(cardItem.sale.old_cost)}}
          </span>
        </div>
    	</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>

.cards {
    margin-left: -20px;
    margin-top: -20px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    text-align: left;
}
.cards:not(.small) .card {
    cursor: pointer;
    border-radius: 3px;
    -wekbit-box-shadow: 0 .25rem .75rem rgba(0,0,0,.05);
    box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.05);
}
.cards .card {
    position: relative;
    background: #fff;
    width: calc(100% - 20px);
    overflow: hidden;
}
.cards .card, .cards .preloader {
    margin-top: 20px;
    margin-left: 20px;
}
.animate {
    animation-fill-mode: both;
    /*animation-duration: .75s;*/
    animation-duration: .6s;
}
.cards:not(.small) .card {
      &:hover {
        .name {
          color: #21ba45;
        }
      }
}

.cards .card {
	@media screen and (min-width: 480px) {
	    /*width: calc(50% - 20px);*/
	}
}
.cards .card {
	@media screen and (min-width: 960px) {
	    /*width: calc(33.33% - 20px);*/
	    min-height: 0;
	}
}

.cards .card .image {
    background: #f0f0f0 no-repeat 50%;
    background-size: cover;
    position: relative;

    /*height: 100%;*/
}
.image {
  height: calc(100vw - 50px);
  width: calc(100vw - 50px);

  @media screen and (min-width: 480px) {
    height: calc(50vw - 40px);
    width: calc(50vw - 40px);
  }
  @media screen and (min-width: 960px) {
    height: 30vw;
    width: 30vw;
    height: calc(30vw - 5px);
    width: calc(30vw - 5px);
  }
  @media screen and (min-width: 1000px) {
    height: 300px;
    width: 300px;
  }
}

.cards.inner .card .description {
    position: absolute;
    /*width: 100%;*/
    /*height: 100%;*/
    /*width: 100%;*/
    width: calc(100% - 52px);
    height: calc(100% - 52px);
    color: #fff;
    top: 0;
    z-index: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-line-pack: end;
    align-content: flex-end;
    text-align: left;

    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 60%;
      z-index: -1;
      background: rgba(0,0,0,.6);
      background: linear-gradient(180deg,transparent 0,rgba(0,0,0,.8));
    }
}
.cards .card .description {
    padding: 26px;
    position: relative;
}

.cards.inner .card .description .cost .old-cost, .cards.inner .card .description .sub-text {
    opacity: .8;
}
.cards .card .description .cost {
    font-weight: 700;
    /*font-size: 120%;*/
}
.cards.inner .card .description>:not(.sale) {
    width: 100%;
}
.cards .card .description .sub-text {
    margin-bottom: 5px;
}
.sub-text {
    opacity: .3;
    text-transform: uppercase;
    font-size: 11.7px;
    font-weight: 700;
    line-height: 120%;
    display: block;
}

.cards .card .description .name {
    font-size: 28px;
    line-height: 32px;
    font-weight: 700;
    margin-bottom: 15px;
    word-wrap: break-word;
    word-break: normal;
    word-break: break-word;
    transition: all .3s ease;
}

.cards .card .description .cost .old-cost {
    font-size: 80%;
    opacity: .3;
    position: relative;
    display: inline-block;
    text-decoration: line-through;
}

.cards.inner .card .description .sale {
    top: 16px;
    right: 16px;
}
.cards .card .description .sale {
    position: absolute;
    z-index: 10;
    color: #fff;
    display: -ms-flexbox;
    display: flex;
    border-radius: 50px;
    -wekbit-box-shadow: 0 5px 17px rgba(255,74,74,.4);
    box-shadow: 0 5px 17px rgba(255,74,74,.4);
}
.cards .card .description .sale>:last-child {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    /*padding-right: 16px;*/
    padding-right: 10px;
}
.cards .card .description .sale__size {
    background: #ff4a4a;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    padding-left: 16px;
    font-size: 1.2em;
}
.cards .card .description .sale>* {
    padding: 6px 10px;
}
.sale {
    font-size: 14px;
}

.displayNone {
  display: none;
}
/*
.displayNone {
  -webkit-animation: fadeout 2s cubic-bezier(0, 1.15, 0.2, 1) alternate 2;
  -moz-animation: fadeout 2s cubic-bezier(0, 1.15, 0.2, 1) alternate 2;
  animation: fadeout 1s cubic-bezier(0, 1.15, 0.2, 1) alternate 1;
}
@-webkit-keyframes fadeout {
    from { opacity: 0}
    to { opacity: 1; display: none !important; }
}
@-moz-keyframes fadeout {
    from { opacity: 0 }
    to { opacity: 1; display: none !important;}
}
@keyframes fadeout {
    from { opacity: 0; }
    to { opacity: 1; display: none !important; }
}

@-webkit-keyframes fadeout {
    0% { opacity: 0}
    100% { opacity: 1; display: none !important; }
}
@-moz-keyframes fadeout {
    0% { opacity: 0 }
    100% { opacity: 1; display: none !important;}
}
@keyframes fadeout {
    0% { opacity: 0; }
    100% { opacity: 1; display: none !important; }
}
*/

.animate {
    animation-fill-mode: both;
    animation-duration: .75s;
}
.zoomIn {
    animation-name: a;
}
@-webkit-keyframes a {
    0% { opacity: 0; transform: scale3d(.3,.3,.3); }
    50% { opacity: 1; display: none !important; }
}
@-moz-keyframes a {
    0% { opacity: 0; transform: scale3d(.3,.3,.3); }
    50% { opacity: 1; display: none !important; }
}
@keyframes a {
    0% { opacity: 0; transform: scale3d(.3,.3,.3); }
    50% { opacity: 1; display: none !important; }
}

.zoomOut {
    animation-name: b;
}
@-webkit-keyframes b {
    0% { opacity: 1; }
    50% { opacity: 0; transform: scale3d(.3,.3,.3); }
    100% { opacity: 0;}
}
@-moz-keyframes b {
    0% { opacity: 1; }
    50% { opacity: 0; transform: scale3d(.3,.3,.3); }
    100% { opacity: 0;}
}
@keyframes b {
    0% { opacity: 1; }
    50% { opacity: 0; transform: scale3d(.3,.3,.3); }
    100% { opacity: 0;}
}

</style>