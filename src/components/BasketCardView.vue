<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

import { namespace } from 'vuex-class';
const categoryModule = namespace('CategoryModule');
const modal = namespace('Modal');
const cart = namespace('Cart');

@Component({})
export default class BasketCardView extends Vue {

  @cart.State
  public cartArr
  @cart.Mutation
  public delById!: (delById) => void

  @modal.Mutation
  public setModal!: (newState: boolean) => void
  @modal.Mutation
  public setIsInBasketAllItemsRemove!: (newState: boolean) => void

  @categoryModule.State
  public prefix!: string

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

    const formattedCost = new Intl.NumberFormat(nFormat, 
      {
        style:'decimal',
        currency: this.prefix,minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(convertCost) + " " + postFix;

    return formattedCost;
  }
  removeClick(par) {
    this.delById(par);

    if (this.cartArr.length === 0) {
      this.setModal(false);
      this.setIsInBasketAllItemsRemove(true);
    }
  }
}
</script>

<template>
<div class="js-cart-items-area">
	<div
	  v-for="basketItem in this.cartArr"
	  v-bind:key="basketItem.id" 
	  :cardItem="basketItem"
	  class="itemsVfor"
	>
		<div class="item">
		  <div class="image" :style="{ backgroundImage: `url('${basketItem.image}')` }"></div>
		    <div class="content">
		      <div class="sub-text"> 
		        <font-awesome-icon class="tags icon" icon="tag" />
		        {{ basketItem.categoryName }}
		      </div>
		      <div class="name name_inCart">{{ basketItem.name }}</div>
		      <div class="cost"><span class="change-cost">{{formattedCur(basketItem.cost)}}</span></div>
		      <div class="actions" data-id="517789">
		        <span 
		          class="button2 action icon-only js-remove-item-from-cart"
		          @click="removeClick(basketItem.id)"
		        >
		          <font-awesome-icon class="trash alternate icon" icon="trash-alt" />
		        </span>
		    </div>
		  </div>
		</div>
	</div>
</div>
</template>

<style lang="scss" scoped>

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

.js-cart-items-area>.cart, .item {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    padding: 10px 0;
    border-bottom: 2px solid #f4f4f4;
}
.js-cart-items-area > .itemsVfor:last-child > .item {
    border: 0;
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

/*
.item:last-of-type {
    border: 0 !important;
    padding-bottom: 0 !important;

    border: 0;
    padding-bottom: 0;
}
*/

</style>