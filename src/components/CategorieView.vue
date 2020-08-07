<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { CategorieItem } from "../types";

@Component
export default class CardView extends Vue {
  @Prop() categorieItem?: CategorieItem;
  active: boolean = false;

  toggle() {
    console.log('TEST');
    console.log(this);

    this.active = !this.active;

    //return this.active;
  }

}
</script>

// v-bind:class="[categorieItem.id === 1 ? '' : '', '']"
//
// class="button action"
// :class="{ active }"
//
//      class="button action"
//      v-bind:class="{ active: active }"
//      v-on:click="toggle"
<template>
	<div class="categories buttons-group">

    <div 
      class="button action"
      :class="toggle1"
    >
      <span class="label">
        <font-awesome-icon class="tags icon" v-if="categorieItem.id === 1" icon="tags" />
        <font-awesome-icon class="tags icon" v-else icon="tag" />
      </span>
      {{categorieItem.name}}
    </div>

	</div>
</template>

<style lang="scss" scoped>

.button span {
    margin: 0;
}
span.icon, span.icons {
    /*font-size: 1em;*/
}
span.icon {
    display: inline-block;
    opacity: 1;
    margin: 0 .25rem 0 0;
    width: 1.18em;
    height: 1em;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-decoration: inherit;
    text-align: center;
    speak: none;
    font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.categories {
    margin-bottom: 30px;
}
.buttons-group {
    /*margin-top: -8px;*/
    /*margin-right: -8px;*/
    /*display: -ms-flexbox;*/
    /*display: flex;*/
    /*-ms-flex-wrap: wrap;*/
    /*flex-wrap: wrap;*/

    /*width: max-content;*/
    display: inline-block;
    font-size: 12px;
    text-align: left;
}

.buttons-group > .button {
    margin-top: 8px;
    margin-right: 8px;
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
.button.action {
    background: #e7e8e9;
    padding: 10px;
    color: #333;
    overflow: hidden;
    border-radius: 3px;
}
.button.action.active {
    pointer-events: none;
    background: #1b1c1d;
    color: #fff;
    cursor: pointer;
}
.button.action:hover {
    background: #d6d7d8;
}

.button.action .label {
    padding-right: 5px;
}
.button.action.icon-only .icon, .button.action .label {
    opacity: .5;
}

</style>