<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { CardItem } from "../types";

@Component
export default class CardView extends Vue {
	@Prop() cardItem?: CardItem;
	// const cardImage = cardItem.image;
	// cardImage: string = CardItem.image;
	cardImage: string = 'https://i.trademc.org/shops/3/M/3MQwN232Vh.jpg';

	truncate (str: string, n: number) {
		// for truncate description 
	}	

	openModal(id: string, cardItem: any) {
		// this open Modal
		// @click=openModal(cardItem.id, cardItem)
	}
}
</script>

<template>
	<div>

		<div>
			{{cardItem.title}}
		</div>
		<div :style="{ backgroundImage: `url('${cardItem.image}')` }" >
		</div>

	</div>
</template>

<style lang="scss" scoped>

</style>