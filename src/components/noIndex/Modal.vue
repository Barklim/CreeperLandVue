<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class';
const modal = namespace('Modal');

@Component({})
export default class Modal extends Vue {
	private isVisible: string = "none";
	private updateProps: string = "";

  @modal.State
  public modal!: boolean
  @modal.Mutation
  public setModal!: (newState: boolean) => void

  clickMarginModal(e) {
    e.target.className === 'close modal-close' ? this.setModal(false) : null; 
  }
  hideBodyScroll() {
  	window.document.body.style.overflow = "hidden"
  }
  showBodyScroll() {
  	window.document.body.style.overflow = "auto"
  }
  mounted() {
  	this.modal ? this.isVisible = "block" : this.isVisible = "none";
  	this.modal ? this.hideBodyScroll() : this.showBodyScroll();
  }
  updated() {
  	this.modal ? this.isVisible = "block" : this.isVisible = "none";
  	this.modal ? this.hideBodyScroll() : this.showBodyScroll();
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
      <div class="content clear-fix animate fast">
        <div class="item">
        	<div class="image" style="background-image:url(https://i.trademc.org/shops/9/i/9i85O8H4Kb.jpg)"></div>
          <div class="content">
        	  <div class="content__area">
              <div class="sub-text"> <i class="tag icon"></i>Привилегии</div>
              <div class="name">Иссушитель</div>
              <div class="cost">1 240.00 ₽</div>
              <div class="js-add-to-cart button themed-button">Добавить в корзину</div>
              <div class="description">
              	<strong>Выживание</strong><br>- 6 точек дома<br>- 6 приватов по 1 250 000 блоков<br>- x2 множитель добычи валюты с мобов<br>- 45 слотов в рюкзаке<br>- /workbench виртуальный верстак<br>- /enderchest виртуальный эндер-сундук<br>- /feed покормить себя<br>- /heal исцелить себя<br>- /kit Wither<br><br><strong>Whitelist</strong><br>- Доступ<br><br><em>Навсегда!</em>
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

	@media screen and (min-width: 480px) {
    /*height: auto;*/
    bottom: auto;
    left: auto;
    right: auto;
    /*overflow: visible;*/
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    -wekbit-box-shadow: 0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2);
    box-shadow: 0 9px 46px 8px rgba(0,0,0,.14), 0 11px 15px -7px rgba(0,0,0,.12), 0 24px 38px 3px rgba(0,0,0,.2);
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
  font-size: 120%;
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
}

.content::-webkit-scrollbar {
	display: none;
}
body {
  overflow: hidden;
}

</style>