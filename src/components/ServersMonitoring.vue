<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import axios from "axios";
import { ServersMonitoringI } from "../types/ServersMonitoring";

@Component({})
export default class ServersMonitoring extends Vue {
  @Prop() serversMonitoring?: ServersMonitoringI;
  percentWidth: string = "";
  loading: boolean = true;
  errored: boolean = false;
  players: number = 0;
  maxPlayers: number = 0;

  mounted() {
    axios
      .get("https://api.trademc.org/shop.getOnline?shop=129168&v=3")
      .then(response => {
        const maxPlayers = response.data.response.max_players;
        const players = response.data.response.players;

        this.maxPlayers = maxPlayers;
        this.players = players;
        //localStorage.setItem("maxPlayers", JSON.stringify(maxPlayers));
        //localStorage.setItem("players", JSON.stringify(players));

        // I try to realyze Math.round10 how in Mdn in paper about Math.round but i solve to use Math.round

        const playerPercent = (players / maxPlayers) * 100;
        const playerRounded = Math.round(playerPercent);

        this.percentWidth = playerRounded + "%";
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
  /*computed: {
	  normalizedSize: function () {
	    return this.size.trim().toLowerCase()
	  }
	}*/
}
</script>

<template>
  <div class="module-servers-monitoring">        	    	
    <div class="white-area">
      <div class="wrapper">
        <div class="bars">
          <div class="progress-bar" data-monitoring="129168">
            <div class="label">
              <div class="shop-name">Creeper Land</div>
            </div>        		        	
            <div class="bar">
              <div :style="{ width: `${percentWidth}` }" class="fill"></div>
            </div>
          <div class="server-info">IP: creeper.land  Онлайн: {{players}}/{{maxPlayers}}  </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

.white-area {
  background: #fff;
}
.wrapper {
  max-width: 980px;
  margin: 0 auto;
  padding: 80px 20px;
  box-sizing: border-box;
}
.bars {
  margin-left: -40px;
  margin-top: -40px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  .progress-bar {
    margin-top: 40px;
    margin-left: 40px;
    width: 100%;
    /* */
    text-align: initial;

    .bar {
    	border-radius: 5px;
      /* */
      background: #f8f9fa;
    	.fill {
    		border-radius: 5px;
    		/* */
    		background: #21ba45;
		    height: 5px;
		    /* max-width: 100%; */
        width: 0;
		    transition: width 1s ease-out;
    	}
    }

  	&:last-child {
	    -ms-flex-positive: 1;
  		flex-grow: 1;
  	}
  	@media screen and (min-width: 480px) {
  		width: calc(50% - 40px);
  	}
	}
}

.progress-bar > .label {
	margin-bottom: 10px;

	.shop-name {
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
	}
	@media screen and (min-width: 480px) {
		display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    /* align-items: center; */
	}
}

.fill {
	/* width: 5.33333%; */
}

.server-info {
  -ms-flex-align: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 11.7px;
  opacity: .3;
  margin-top: 5px;
}
</style>
