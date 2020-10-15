<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const cart = namespace('Cart');

@Component({})
export default class FixedCart extends Vue {
	private shake: string = "";

  @cart.State
  public cartArr

  clearShakeClass() {
  	this.shake = "";
  }

  doShake() {
  	setTimeout(this.clearShakeClass, 750);
    this.shake = "shake";
  }
  mounted() {
    console.log('!!!')
    console.log(this.cartArr)
  }
}
</script>

<template>

	<div 
	  class="button themed-button cart-button open-cart animate"
	  v-bind:class="[shake]" 
	  style="bottom: 80px;"
	  @click="doShake()"
	>
  	<font-awesome-icon class="shopping1 basket1 icon1 shoppingBasket" icon="shopping-basket" style="font-size: 18px;"/>
  	<span 
      class="corner items-count"
      v-if="this.cartArr.length > 0"
    >
      {{ this.cartArr.length }}
    </span>
  </div>

</template>

<style lang="scss" scoped>

/* body.buttons-default.green-buttons .themed-button*/
.themed-button {
    background: #21ba45;
    background: linear-gradient(90deg,#32cb56 0,#19a12c);
    background-size: 200% 1px;
    -wekbit-box-shadow: 0 5px 17px rgba(0,83,20,.4);
    box-shadow: 0 5px 17px rgba(0,83,20,.4);

    border-radius: 25px;
    display: flex !important;
    align-items: center;
    justify-content: center;

  &:hover {
    background: linear-gradient(90deg, #21ba45 0, #007601);
    box-shadow: 0 5px 17px rgba(0, 83, 20, 0.4);
  }
  &:active {
    background: #007601;
    background: linear-gradient(90deg,#189e29 0,#017702);
  }
}
.button.cart-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 99!important;
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding: 0!important;
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
}
.animate {
    animation-fill-mode: both;
    animation-duration: .75s;
}

.button .corner:empty {
    display: none;
}
.button .corner {
    position: absolute;
    background: #ff5b5b;
    width: 20px;
    height: 20px;
    line-height: 20px;
    top: 0;
    right: 0;
    font-size: 10px;
    font-weight: 400;
    color: #fff;
    border-radius: 50%;
    transform: translate(25%,-25%);
}

.shake {
    animation-name: c;
}
@keyframes c {
  0%, 100% {
    transform: translateZ(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-10px,0,0);
  }
  20%, 40%, 60%, 80% {
    transform: translate3d(10px,0,0);
  }
}

</style>