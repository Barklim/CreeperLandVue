<template>
  <div class="home">
    <main class="main">

      <ServersMonitoring></ServersMonitoring>

      <CardViewContainer></CardViewContainer>

      <LastPurchases></LastPurchases>

    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CardViewContainer from "../components/CardViewContainer.vue";
import ServersMonitoring from "../components/ServersMonitoring.vue";
import LastPurchases from "../components/LastPurchases.vue";

@Component({
  components: {
    CardViewContainer,
    ServersMonitoring,
    LastPurchases
  }
})
export default class Home extends Vue {

}
</script>

<style lang="scss" scoped>

.articles-control {
  .el-input {
    display: inline-block;
    width: 250px;
    margin: 0 5px 0 0;
    @media (max-width: 768px) {
      display: block;
      width: 100%;
      margin: 0 0 10px 0;
    }
  }
}
.block-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

</style>
