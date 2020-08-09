<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { CardItem } from "../types";
import { namespace } from 'vuex-class';
const categoryModule = namespace('CategoryModule')

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
  @categoryModule.State
  public prefix!: string

	truncate (str: string, n: number) {	
		// for truncate description 
	}	
	openModal(id: string, cardItem: any) {
		// this open Modal
		// @click=openModal(cardItem.id, cardItem)
	}
  toFixed(value) {
    // return '$' + value.toFixed(2)
    return value.toFixed(2)
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
    const formattedCost = new Intl.NumberFormat(nFormat, { currency: this.prefix, maximumFractionDigits: 2 }).format(convertCost) + " " + postFix;

    return formattedCost;
  } 
}
</script>

<template>
	<div class="">

    <div class="card animate">
      <div class="image" :style="{ backgroundImage: `url('${cardItem.image}')` }">
    	</div>
    	<div class="description">
    		<div class="sub-text">
    			<font-awesome-icon class="tags icon" icon="tag" />
          {{cardItem.category}}
    		</div>
    		<div class="name">{{cardItem.name}}</div>
    		<div class="cost">{{formattedCur(cardItem.cost)}}</div>
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
    animation-duration: .75s;
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
    width: 100%;
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

</style>