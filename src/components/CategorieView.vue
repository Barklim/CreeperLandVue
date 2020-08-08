<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { CategorieItem } from "../types";

@Component
export default class CardView extends Vue {
  @Prop() categorieItem?: CategorieItem;
  private isActive: boolean = false;
  private curActive: number;
  // Create variable for vuex, current state of categorie button; 

  methods() {
      const toggle2 =  function(event) {
        this.isActive = !this.isActive;
    }
  }
  toggle() {
    this.isActive = !this.isActive;
  }
  toggleActive(event) {

    //activeCategory
    const element = event.currentTarget;
    const itemHasClass = element.classList.contains('active');

    if (!itemHasClass) {

      // Clear all active state if this is not this element
      this.$parent.$children.forEach(element1 => element1.$el !== element ? element1.isActive = false : null );

      this.toggle();
    }
  }

  mounted() {
    // Category 'All'
    if(this.categorieItem.id === 1) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }
  computed() {
    const test = function(event) {
      return 'Пользователь: ' + this.name.toUpperCase();
    }
  }

}
</script>

<template>
	<div class="categories buttons-group">

    <div 
      class="button action"
      v-bind:class="{ active: isActive }"
      v-on:click="toggleActive"
      v-bind:categorieId="categorieItem.id"
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
    /*pointer-events: none;*/
    background: #1b1c1d;
    color: #fff;
    cursor: pointer;
}
  
.button.action:hover {
    background: #d6d7d8;
}
.button.action.active:hover {
  background: #1b1c1d;
}

.button.action .label {
    padding-right: 5px;
}
.button.action.icon-only .icon, .button.action .label {
    opacity: .5;
}

</style>