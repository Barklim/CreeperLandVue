<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { CardItem } from "../types";

@Component
export default class CardView extends Vue {
	@Prop() cardItem?: CardItem;
	// const cardImage = cardItem.image;
	// cardImage: string = CardItem.image;
	cardImage: string = 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg';
  errored: boolean = false;

  //@Prop() cattegoriesButton1?;

	truncate (str: string, n: number) {	
		// for truncate description 
	}	

	openModal(id: string, cardItem: any) {
		// this open Modal
		// @click=openModal(cardItem.id, cardItem)
	}

  mounted() {
    console.log('TEST 123');
    console.log(this.cardItem);
  }

}
</script>

<template>
	<div class="">

    <div class="card animate">
    	<!-- <div class="image"> -->
        <div class="image" :style="{ backgroundImage: `url('${cardItem.image}')` }">
    	</div>
    	<div class="description">
    		<div class="sub-text">
    			<font-awesome-icon class="tags icon" icon="tag" />
          {{cardItem.category}}
    		</div>
    		<div class="name">{{cardItem.name}}</div>
    		<div class="cost">{{cardItem.cost}}</div>
    	</div>
<!-- 			<div>
				{{cardItem.title}}
			</div>
			<div :style="{ backgroundImage: `url('${cardItem.image}')` }" >
			</div> -->
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
    /* !!! */
    height: 74%;
    color: #fff;
    top: 0;
    z-index: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-line-pack: end;
    align-content: flex-end;
}
.cards .card .description {
    padding: 26px;
    position: relative;
}

.cards.inner .card .description .cost .old-cost, .cards.inner .card .description .sub-text {
    opacity: .8;
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