<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

import BasketCardView from "../../components/BasketCardView.vue";
import BasketCardSpec from "../../components/BasketCardSpec.vue";
import { CartItem } from "../../types";
import { getById } from "../../utils";

import { namespace } from 'vuex-class';
const categoryModule = namespace('CategoryModule');
const modal = namespace('Modal');
const cart = namespace('Cart');

@Component({
  components: {
    BasketCardView,
    BasketCardSpec
  }
})
export default class Modal extends Vue {

  // Todo
  // Нужно написать парсер на поле cardItem.description, для обозначений [b], [i] переводы строки

	@Prop() cartItem?: CartItem;
	
	private isVisible: string = "none";
  private isVisibleBasket: string = "none";
  private zoomIn: string = "";
  private zoomOut: string = "";
  private zoomInBasket: string = "";
  private addButtonHide: string = "";
  private addButtonHide1: string = "";
  private display1: string = "";
  private display2: string = "";
  private changeState: boolean = false;
  private showBasketModal: boolean = false;
  private itemsSum: number = 0;

  @categoryModule.State
  public prefix!: string

  @modal.State
  public cardItem
  @modal.State
  public modal!: boolean
  @modal.State
  public isInBasket!: boolean
  @modal.State
  public isInBasketAllItemsRemove!: boolean
  @modal.State
  public showBasketModalAtonce!: boolean

  @modal.Mutation
  public setModal!: (newState: boolean) => void
  @modal.Mutation
  public setIsInBasket!: (newState: boolean) => void
  @modal.Mutation
  public setIsInBasketAllItemsRemove!: (newState: boolean) => void
  @modal.Mutation
  public setFalseBasketModal!: () => void

  @cart.State
  public qttySum!: boolean
  @cart.State
  public cartArr
  @cart.Mutation
  public setCartArr!: (newCartItem: CartItem) => void

  clickMarginModal(e) {
    e.target.className === 'close modal-close' ? this.setModal(false) : null;

	 	this.display1 = "";
	 	this.display2 = "";

    e.target.className === 'close modal-close' ? this.hideModalBasketAsync() : null;

    // this.isVisibleBasket = "none";
    // this.hideModalBasketAsyncCss()
  }
  clickClose() {
  	this.setModal(false);

	 	this.display1 = "";
	 	this.display2 = "";

    this.hideModalBasketAsync();

    // this.isVisibleBasket = "none";
    // this.hideModalBasketAsyncCss()
  }
  hideBodyScroll() {
  	window.document.body.style.overflow = "hidden"
  }
  showBodyScroll() {
  	window.document.body.style.overflow = "auto"
  }

  himdeModalBasketCss() {
    this.isVisibleBasket = "none";
  }
  hideModalBasketAsyncCss() {
    setTimeout(this.himdeModalBasketCss, 250)
  }

  hideModal1() {
  	this.isVisible = "none";

		this.modal ? this.hideBodyScroll() : this.showBodyScroll();

		this.addButtonHide = '';
		this.addButtonHide1 = '';
  }
  hideModal() {
  	setTimeout(this.hideModal1, 250)
  }

  himdeModalBasket() {
    this.showBasketModal = false;
  }
  hideModalBasketAsync() {
    setTimeout(this.himdeModalBasket, 250)
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
  isModalOrBasket() {
    return !this.showBasketModal;
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
  addButtonClick(e) {
  	this.setCartArr(this.cardItem)
  	this.setIsInBasket(true);

  	this.changeState = true;
  }

  zoomInBasketModal() {
    this.zoomInBasket = "zoomIn"
    this.isVisibleBasket = "block";
  }
  zoomInBasketModalAsync() {
    this.isVisibleBasket = "none";
    setTimeout(this.zoomInBasketModal, 100)
  }

  showBasketButtonClick(e) {

    this.zoomInBasketModalAsync();
    this.zoomInBasket = "";
    this.isVisible = "";

    this.showBasketModal = !this.showBasketModal;

    // Set in redux from localStorage here
  	// this.setCartArr(itemObj1);

    //console.log('!!! !!!')
    //console.log(this.cartArr)
    //console.log(this.itemsSum)
    this.itemsSum = 0;
    this.cartArr.forEach(element => this.itemsSum = this.itemsSum + element.qtty*element.cost);
    //console.log(this.itemsSum)
    // засетить тут а потом дальше по кликам удалять прибавлять
  }
  addButtonMoreClick(e) {
    this.setModal(false);
  }
  computeFirst() {
  	this.display1 = this.isInBasket ? 'addButtonHide': ''; 
  }
  computeSecond() {
  	this.display2 = this.isInBasket ? '': 'addButtonHide';
  }

  // KeyBinding
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.clickClose();
      }
    })
  }
  mounted() { 
  	this.modal ? this.isVisible = "block": this.isVisible = "none";
  	this.modal ? this.hideBodyScroll()   : this.showBodyScroll();
  	this.modal ? this.zoomIn = "zoomIn"  : this.zoomIn = "";

  	this.addButtonHide = ''
  	this.addButtonHide1 = 'addButtonHide'
  }
  updated() {

  	if (this.changeState) {
  		this.changeState = false;

  		this.computeFirst()
  		this.computeSecond()
  	}

  	this.modal ? this.zoomIn = "zoomIn"  : this.zoomIn = "";
  	this.modal ? this.zoomOut = ""  : this.zoomOut = "zoomOut";
  	this.modal ? this.hideBodyScroll() : null;
  	this.modal ? this.isVisible = "block" : this.hideModal();

    if (this.isInBasketAllItemsRemove)
    {
      this.setIsInBasketAllItemsRemove(false);
      this.clickClose()
    }

    if (this.showBasketModalAtonce) {
      this.setFalseBasketModal();

      this.zoomInBasketModalAsync();
      this.zoomInBasket = "";
      this.isVisible = "";
      this.showBasketModal = !this.showBasketModal;
    }

    // console.log('!!!')
    // console.log(this.cartArr)
    // console.log(this.itemsSum)
    // this.qttySum = this.cartArr[0].cost*this.cartArr[0].qtty;
  }
}
</script>

<template>
	<div
	  class="modal"
	  v-bind:class="[isVisible, modal]"
	  v-bind:style="{display: isVisible}"
	  @click="this.clickMarginModal"
	 >
  	<div class="layer">
      <div class="close modal-close">
      	<div 
      	  class="close-button"
      	  @click="clickClose"
      	 ></div>
      </div>
      <div 
        class="content clear-fix animate fast"
        v-bind:class="[zoomIn, zoomOut]"
        v-if="isModalOrBasket()"
      >
        <div class="item">
        	<div class="image" :style="{ backgroundImage: `url('${cardItem.image}')` }"></div>
          <div class="content">
        	  <div class="content__area">
              <div class="sub-text"> <i class="tag icon"></i>
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
              <div 
                class="js-add-to-cart button themed-button"
                v-bind:class="{ addButtonHide: this.isInBasket }"
                @click="this.addButtonClick"
                id="firstButton"
              >
                Добавить в корзину
              </div>

              <div 
                v-bind:class="{ addButtonHide: !this.isInBasket }"
                id="secondButton"
               >
	              <div 
                  class="js-add-to-cart button themed-button"
                  @click="this.showBasketButtonClick"
                >
                  В корзине
                </div>
                <div 
                  @click="this.addButtonMoreClick" 
                  class="button1 button1_shift"
                >
                	Выбрать еще
                </div>
              </div>
              <div class="description">
              	<strong>Выживание</strong><br>- 6 точек дома<br>- 6 приватов по 1 250 000 блоков<br>- x2 множитель добычи валюты с мобов<br>- 45 слотов в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /kit Wither<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="content clear-fix animate fast"
        v-bind:class="[zoomInBasket, zoomOut]"
        v-bind:style="{display: isVisibleBasket}"
        v-else
      >
        
      <form class="cart js-buy-form">
        <div class="items">
          <h2>Корзина</h2>
            <div class="js-cart-items-area">
              <BasketCardView></BasketCardView>
            </div>
            <BasketCardSpec></BasketCardSpec>
         </div>
         <div class="form">
            <div class="total-cost">
              <div class="sub-text">Итого:</div>
              <!-- 3 640.00 ₽ -->
              <div class="value total-cost-value">{{formattedCur(this.itemsSum)}}</div>
            </div>
            <div class="form-notice"></div>
            <p>Для продолжения заполните форму ниже:</p>
            <div class="js-buyer-area">
              <div class="field">
                <div class="input">
                  <label>
                    <input required="" name="buyer" class="input-reset">
                      <span>Игровой никнейм</span>
                    </label>
                  </div>
               </div>
            </div>
            <div class="field">
              <div class="input">
                <label>
                  <input name="coupon" class="input-reset1">
                  <span>Купон на скидку</span>
                </label>                            
                <div class="input__ui">
                  <span class="link js-apply-coupon" data-active="Удалить">Применить</span>
                </div>
               </div>
               <small>Если у вас есть купон на скидку, то вы можете ввести его в данное поле</small>                          
            </div>
            <div class="actions">
              <button class="button themed-button animate" type="submit">Продолжить</button>
            </div>
         </div>
      </form>

      </div>
  	</div>
  </div>
</template>

<style lang="scss" scoped>

.input-reset:focus-visible { 
  box-shadow: inset 0 0 0 1px rgba(33,186,69,.5); 
  outline: none !important;
  width: 32vw !important;
  display: block;
  flex-grow: 1;
  position: relative;
}
.input-reset1:focus-visible {  
  outline: none !important;
}

.modal {
  background: rgba(0,0,0,.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 199;
  display: none;
  /*overflow: visible;*/
  /*overflow: hidden;*/
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: inherit;

	@media screen and (max-width: 800px) {
    overflow: auto;
	}

	.layer {
    position: relative;
    min-height: 100%;

		@media screen and (min-width: 480px) {
      padding: 80px 10px;
	  }
	}
}

.modal .layer>.close {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .close-button {
	    position: absolute;
	    width: 30px;
	    height: 30px;
	    top: 10px;
	    right: 10px;
	    cursor: pointer;
	    opacity: .6;
	    transition: all .1s ease;

	    &:before {
	    	transform: rotate(45deg);

  	    content: "";
		    width: 2px;
		    height: 100%;
		    background: #fff;
		    position: absolute;
		    left: 50%;
	    }

	    &:after {
	    	transform: rotate(-45deg);

	    	content: "";
		    width: 2px;
		    height: 100%;
		    background: #fff;
		    position: absolute;
		    left: 50%;
	    }

	    &:hover {
  	    opacity: 1;
	    }
    }
}

.modal .layer>.content {
	background: #fff;
  max-width: 1024px;
  height: auto;
  /*height: calc(100% - 100px);*/
  /*height: calc(100vh - 238px);*/
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  position: absolute;
  -wekbit-box-shadow: 0 -10px 20px rgba(0,0,0,.2);
  box-shadow: 0 -10px 20px rgba(0,0,0,.2);

  /* 480 */
	@media screen and (min-width: 480px) {
    /*height: auto;*/
    bottom: auto;
    left: auto;
    right: auto;
    /*overflow: visible;*/
    /*overflow: hidden;*/
    position: relative;
    margin: 0 auto;
    -wekbit-box-shadow: 0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2);
    box-shadow: 0 9px 46px 8px rgba(0,0,0,.14), 0 11px 15px -7px rgba(0,0,0,.12), 0 24px 38px 3px rgba(0,0,0,.2);
  }

  @media screen and (max-width: 480px) {
  	top: 70px;
    position: relative;
  }
}

.animate.fast {
    animation-duration: .35s;
}
.animate {
    animation-fill-mode: both;
    animation-duration: .75s;
}
.clear-fix {
  position: relative;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
}

.modal .layer>.content>.item .image {
	background-image: url(https://i.trademc.org/shops/9/i/9i85O8H4Kb.jpg); /* !!! */
	height: auto;
	/*height: calc(100vh - 238px);*/

	@media screen and (min-width: 800px) {
    width: 59%;
    float: right;
	}
}
.modal .layer > .content > .item .image {
    /*background-image: url(https://i.trademc.org/shops/9/i/9i85O8H4Kb.jpg); */
}
.modal .layer>.content .cart .image, .modal .layer>.content .item .image {
    background: #f0f0f0 no-repeat 50%;
    background-size: cover;
    position: relative;
}
.modal .layer>.content .cart .image,
.modal .layer>.content .item .image {
	&:before {
    content: "";
    padding-top: 100%;
    float: left;
	}
	&:after {
    content: "";
    display: block;
    clear: both;
	}
}

.modal .layer>.content>.item .content {
  position: relative;
  /*display: contents;*/
  /* !!! */
  /*overflow: hidden;*/
  text-align: initial;

	@media screen and (min-width: 800px) {
		/* !!! */
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
	}
}
.modal .layer>.content>.item .content__area {
 	padding: 26px;

	@media screen and (min-width: 800px) {
    /*width: 40%;*/
    width: 36%;
	}
}
/* */
.modal .layer>.content .cart .content .sub-text, .modal .layer>.content .item .content .sub-text {
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
/* icon */
.modal .layer>.content .cart .content .name, .modal .layer>.content .item .content .name {
	font-size: 28px;
  line-height: 32px;
  font-weight: 700;
  /*margin-bottom: 15px;*/
  margin-bottom: 8px;
  word-wrap: break-word;
  word-break: normal;
  word-break: break-word;
}
.modal .layer>.content .cart .content .cost, .modal .layer>.content .item .content .cost {
  font-weight: 700;
  /*font-size: 120%;*/
}
.modal .layer>.content>.item .content .button,
.modal .layer>.content>.item .content .button1 {
    margin-top: 20px;
}
body.buttons-default.green-buttons .themed-button {
    background: #21ba45;
    background: linear-gradient(90deg,#32cb56 0,#007601);
    background-size: 200% 1px;
    -wekbit-box-shadow: 0 5px 17px rgba(0,83,20,.4);
    box-shadow: 0 5px 17px rgba(0,83,20,.4);
}
/* button */
.modal .layer>.content>.item .content .description {
  margin-top: 30px;
  word-wrap: break-word;
  word-break: normal;
  word-break: break-word;
  font-size: 13px;
  /*line-height: 19px;*/
  line-height: 20px;
}

.content::-webkit-scrollbar {
	display: none;
}
body {
  overflow: hidden;
}

.content {
	color: #333;

	.cost {
    font-weight: 700;
    /*font-size: 120%;*/
	}

	.js-add-to-cart.button.themed-button {
    margin-top: 20px;
	}

	.themed-button {
    background: #21ba45;
    background: linear-gradient(90deg,#32cb56 0,#007601);
    background-size: 200% 1px;
    -wekbit-box-shadow: 0 5px 17px rgba(0,83,20,.4);
    box-shadow: 0 5px 17px rgba(0,83,20,.4);

    &:hover {
      background: linear-gradient(90deg, #21ba45 0, #007601);
      box-shadow: 0 5px 17px rgba(0, 83, 20, 0.4);
    }
    &:active {
      background: #007601;
      background: linear-gradient(90deg,#189e29 0,#017702);
    }
	}
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
    /*font-size: 90%;*/
    font-size: 70%;
    position: relative;
    white-space: nowrap;
    transition: all .1s ease;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    border-radius: 25px;

    &:hover {
	    background-position: 50%;
	    /* background: linear-gradient(90deg,#32cb56 0,#007601); */
	    background: linear-gradient(90deg, #21ba45 0, #007601);
	    /* background-size: 200% 1px; */
	    box-shadow: 0 5px 17px rgba(0, 83, 20, 0.4);
    }
}
.button1 {
    display: inline-block;
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
    font-size: 70%;
    position: relative;
    white-space: nowrap;
    transition: all .1s ease;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    border-radius: 25px;

    &:hover {
      background: rgba(0,0,0,.05);
    }

    &:active {
      background: #c5c6c7;
    }
}
.button1_shift {
   margin-left: 8px;
}

.button2 {

    display: inline-block;
    color: #8b8c8c !important;
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
    font-size: 76%;
    position: relative;
    white-space: nowrap;
    transition: all .1s ease;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    margin-right: 5px;

    display: block;
    -ms-flex-negative: 0;
    flex-shrink: 0;

    background: #e7e8e9;
    padding: 9px 10px;
    color: #333;
    overflow: hidden;
    border-radius: 3px;

    &:hover {
      background: #d6d7d8;
    }

    &:active {
      background: #c5c6c7;
    }

    .buttonPostix {
      color: #333;
      padding-left: 8px;
    }
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

.old-cost {
	font-size: 80%;
  opacity: .3;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    height: 1px;
    left: 0px;
    right: 0px;
    top: 50%;
    background: rgb(51, 51, 51);
  }
}
.addButtonHide {
	display: none;
}

/* ---------- cardForm ---------- */

@media screen and (min-width: 800px) {
  .modal .layer>.content>.cart {
      display: -ms-flexbox;
      display: flex;
  }
}
.modal .layer>.content>.cart {
    position: relative;
    min-height: 400px;
}
.shoppingBasket {

}

/* ----- Items ----- */

@media screen and (min-width: 800px) {
  .modal .layer>.content>.cart .items {
      width: 60%;
  }
}
.modal .layer>.content>.cart .form, .modal .layer>.content>.cart .items {
    display: block;
    padding: 26px;
}
.modal .layer>.content>.cart .items {
    background: #f8f9fa;
}

h2 {
    font-size: 32px;
    font-weight: 900;
    margin: 0;
    padding-bottom: 40px;
    padding-top: 80px;
    line-height: 1;
    text-align: left;
}
h2:not(.enable-padding):first-child {
    padding-top: 0;
}

.modal .layer>.content>.cart .item {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    padding: 10px 0;
    border-bottom: 2px solid #f4f4f4;
}
.modal .layer>.content>.cart .item:first-of-type {
    padding-top: 0;
}

/* --- Image ---

.modal .layer>.content .cart .image, .modal .layer>.content .item .image {
    background: #f0f0f0 no-repeat 50%;
    background-size: cover;
    position: relative;

    &:before {
      content: "";
      padding-top: 100%;
      float: left;
    }

    &:after {
      content: "";
      display: block;
      clear: both;
    }
}
/* x */
.modal .layer>.content>.cart .item .image {
    width: 100px;
    height: 100px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}
@media screen and (min-width: 480px) {
  .modal .layer>.content>.cart .item .image {
      width: 170px;
      height: 170px;
  }
}
.content > .image {
    width: 100px;
    height: 100px;
    -ms-flex-negative: 0;
    flex-shrink: 0;

    @media screen and (min-width: 480px) {
      width: 170px;
      height: 170px;
    }
}

/* --- Text --- */ 
.content>.cart .item .content {
    padding-left: 16px;
    -ms-flex-positive: 1;
    flex-grow: 1;
    text-align: left;
}

.sub-text {
    opacity: .3;
    text-transform: uppercase;
    font-size: 11.7px;
    font-weight: 700;
    line-height: 120%;
    display: block;
}
.modal .layer>.content .cart .content .sub-text, .modal .layer>.content .item .content .sub-text {
    margin-bottom: 5px;
}

.name_inCart {
  font-size: 18px !important;
}

.change-cost {
  font-size: 13px !important;
}

.actions {
  margin-top: 20px;
  flex-wrap: wrap;
  display: flex;
}

.item:last-of-type {
    border: 0 !important;
    padding-bottom: 0 !important;
}

/* ----- Form ----- */

.form {
  /*text-align: initial;*/
}
.form p {
    margin: 0 0 10px;
    font-size: 13px;
    text-align: left;
}
.form .actions {
    padding-top: 10px;
    margin-top: 0;
}

form .field {
    width: 100%;
    margin-bottom: 10px;
}
.input {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    background: #fff;
    border-radius: 3px;
    -wekbit-box-shadow: 0 0 0 2px #f0f0f0 inset;
    box-shadow: inset 0 0 0 2px #f0f0f0;
    transition: all .1s linear;
    animation-fill-mode: both;
    animation-duration: .75s;

    label {
      display: block;
      -ms-flex-positive: 1;
      flex-grow: 1;
      position: relative;
  }
}
label input {
    padding: 28px 15px 10px;
    width: 100%;
    border: 0;
    line-height: 1;
    background: none;
    -webkit-appearance: none;
    border-radius: 0;
}
.input label>span {
    text-align: left;
    font-size: 13px;

    padding: 0 15px;
    position: absolute;
    top: 50%;
    left: 0;
    opacity: .3;
    pointer-events: none;
    overflow-x: hidden;
    text-overflow: ellipsis;
    width: 100%;
    white-space: nowrap;
    transition: all .1s ease;
    transform: translateY(-50%);
}
.field small {
    text-align: left;
    font-size: 10px;
    padding-top: 5px;
    /*font-size: 80%;*/
    opacity: .5;
    line-height: 1.3;
    display: block;
}

.input__ui {
    padding-right: 15px;
}
span.link.js-apply-coupon {
    font-size: 13px;
    color: #21ba45;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
}

@media screen and (min-width: 800px) {
  .modal .layer>.content>.cart .form {
      width: 40%;
  }
}
.modal .layer>.content>.cart .form, .modal .layer>.content>.cart .items {
    display: block;
    padding: 26px;
}

.content form .total-cost {
    display: -ms-flexbox;
    display: flex;
    font-weight: 700;
    -ms-flex-align: end;
    align-items: flex-end;
}
.content>.cart .form .total-cost {
    padding: 0 0 20px;
    border-bottom: 2px dashed #f4f4f4;
    margin-bottom: 20px;
}

.layer>.content form .total-cost .sub-text {
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
.layer>.content form .total-cost .value {
    font-size: 32px;
    line-height: 30px;
    -ms-flex-positive: 1;
    flex-grow: 1;
    text-align: right;
}

</style>