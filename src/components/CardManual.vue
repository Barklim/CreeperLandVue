<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class CardManual extends Vue {
	
}
</script>

<template>

  <div class="module-manual">
    <h2 class="enable-padding">Инструкция по покупке</h2>
    <div class="manual clear-fix">
      <div class="content">
        <strong>1. Выбор товара</strong>
        <br>
        Добавьте необходимые товары в корзину и заполните предлагаемую форму.
        <br>
        <br>
        <strong>2. Способ оплаты</strong>
        <br>
        Выберите предпочитаемый способ оплаты и следуйте дальнейшим инструкциям.
        <br>
        <br>
        <strong>3. Активация привилегии</strong>
        <br>
        Товар выдается после оплаты в автоматическом режиме и моментально.
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

/* ---------- Manual ---------- */

.manual.clear-fix {
  text-align: initial;
  font-size: 13px;
  line-height: 19.5px;
}
clear-fix {
  &:after {
    content: "";
    display: block;
    clear: both;
  }
}

h2:not(.enable-padding):first-child {
    padding-top: 0;
}
h2 {
    /*font-size: 32px;*/
    font-size: 28px;
    font-weight: 900;
    margin: 0;
    padding-bottom: 40px;
    padding-top: 80px;
    line-height: 1;
    /* */
    text-align: initial;
    color: rgb(51, 51, 51);
}
h2>span {
    margin-top: 10px;
    line-height: 1;
}
.sub-text {
    opacity: .3;
    text-transform: uppercase;
    font-size: 11.7px;
    font-weight: 700;
    line-height: 120%;
    display: block;
}
.sub-text.pseudo-opacity {
    opacity: 1;
    color: #bbbcbd;
}

</style>