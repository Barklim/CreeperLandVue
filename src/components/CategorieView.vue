<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { CategorieItem } from "../types";

@Component
export default class CardView extends Vue {
  @Prop() categorieItem?: CategorieItem;

  mounted() {

    /*
    axios
      .get("https://api.trademc.org/shop.getItems?shop=129168&v=3")
      .then(response => {
        console.log('TEST')
        console.log(response.data.response.categories)
        console.log(this)
        console.log(this.cattegoriesButton)

        // this.cattegoriesButton.push({id: "test", name: "test1"})


      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
      */
  }

}
</script>

<template>
	<div>

    <div>
      {{categorieItem.name}}
    </div>

	</div>
</template>

<style lang="scss" scoped>

</style>