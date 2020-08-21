<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class';
const categoryModule = namespace('CategoryModule');
const modal = namespace('Modal');

@Component({})
export default class Modal extends Vue {
	
	private isVisible: string = "none";
	private updateProps: string = "";
  private zoomIn: string = "";
  private zoomOut: string = "";
  private addButtonHide: string = "";

  @categoryModule.State
  public prefix!: string
  @modal.State
  public modal!: boolean
  @modal.State
  public cardItem
  @modal.Mutation
  public setModal!: (newState: boolean) => void

  clickMarginModal(e) {
    e.target.className === 'close modal-close' ? this.setModal(false) : null;

    // if (!e.target.classList.contains('js-add-to-cart')) {
    // 	this.addButtonHide = ''
    // }
  }
  hideBodyScroll() {
  	window.document.body.style.overflow = "hidden"
  }
  showBodyScroll() {
  	window.document.body.style.overflow = "auto"
  }
  hideModal1() {
  	this.isVisible = "none";

		this.modal ? this.hideBodyScroll() : this.showBodyScroll();
  }
  hideModal() {
  	setTimeout(this.hideModal1, 250)
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
  addButtonClick() {
  	this.addButtonHide = 'addButtonHide'
  }

  mounted() {
  	this.modal ? this.isVisible = "block": this.isVisible = "none";
  	this.modal ? this.hideBodyScroll()   : this.showBodyScroll();
  	this.modal ? this.zoomIn = "zoomIn"  : this.zoomIn = "";
  }
  updated() {
  	this.modal ? this.zoomIn = "zoomIn"  : this.zoomIn = "";
  	this.modal ? this.zoomOut = ""  : this.zoomOut = "zoomOut";
  	this.modal ? this.hideBodyScroll() : null;
  	this.modal ? this.isVisible = "block" : this.hideModal();
  }
}
</script>

<template>
	<div
	  class="modal"
	  v-bind:class="[isVisible, modal]"
	  v-bind:style="{ display: isVisible}"
	  @click="this.clickMarginModal"
	 >
  	<div class="layer">
      <div class="close modal-close">
      	<div 
      	  class="close-button"
      	  @click="setModal(false)"
      	 ></div>
      </div>
      <div 
        class="content clear-fix animate fast"
        v-bind:class="[zoomIn, zoomOut]"
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
                v-bind:class="this.addButtonHide"
                @click="this.addButtonClick"
              >
                Добавить в корзину
              </div>
              <div class="description">
              	<strong>Выживание</strong><br>- 6 точек дома<br>- 6 приватов по 1 250 000 блоков<br>- x2 множитель добычи валюты с мобов<br>- 45 слотов в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /kit Wither<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>
              </div>
              <h1>Это как парсить о_0 ? (На сервере возвращать человеческий html, с классами и т.п.)</h1>
            	<div class="description">
              	{{cardItem.description}}
              </div>
            </div>
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
  overflow: hidden;
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

  &after {
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
  margin-bottom: 15px;
  word-wrap: break-word;
  word-break: normal;
  word-break: break-word;
}
.modal .layer>.content .cart .content .cost, .modal .layer>.content .item .content .cost {
  font-weight: 700;
  /*font-size: 120%;*/
}
.modal .layer>.content>.item .content .button {
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

</style>