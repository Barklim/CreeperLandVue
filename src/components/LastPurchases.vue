<script>

import axios from "axios";

const cards = [
    {
      buyer: "Damir_Devin",
      item: {
        id: 517371,
        image: "https://i.trademc.org/shops/9/1/91MTzIC9NG.jpg",
        name: "Крипер",
      }
    },
    {
      buyer: "ElizaSaigosan",
      item: {
        id: 517773,
        image: "https://i.trademc.org/shops/3/7/372uKIiS5k.jpg",
        name: "Эндермэн",
      }
    },
    {
      buyer: "Molodoi_cheburek",
      item: {
        id: 517773,
        image: "https://i.trademc.org/shops/9/1/91MTzIC9NG.jpg",
        name: "Крипер",
      }
    }
  ]

export default {
  name: 'LastPurchases',
  data() {
    return {
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        allowTouchMove: false,
        pagination: {
          el: '.swiper-pagination',
        },
        breakpoints: {
          480: {
            slidesPerView: 5,
            spaceBetween: 10
          }
        }
      },
      cards
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    axios
      .get("https://api.trademc.org/shop.getLastPurchases?shops=129168&count=10&v=3")
      .then(response => {

        this.cards = response.data.response;
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
      })
      .finally(() => (console.log('finally loading')));

    // повторить с интервалом 4 секунды
    //const timerId = setInterval(() => console.log('tick'), 4000)
    //const swipeNext = this.swiper.slideTo(3, 1000, false)
    //const timerId = setInterval(() => swipeNext, 4000)
    const timerId = setInterval(() => this.swiper.slideNext(1000), 4000)

    // остановить вывод через 120 секунд
    //setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 120000);
  }
}
</script> 

<template>
  <div class="module-last-purchases">
    <div class="white-area">
      <div class="wrapper">

      <h2>Последние покупки 
        <span class="sub-text">Последние товары, приобретенные пользователями в магазине</span>
      </h2>

      <!-- ---------- Cards ---------- -->
      <swiper v-if="cards" ref="mySwiper" :options="swiperOptions" id="items" class="cards">
        <swiper-slide 
          v-for="cardItem in cards"
          v-bind:key="cardItem.id" 
          :cardItem="cardItem"
        >
          <div class="card">
            <div class="image"  :style="{ backgroundImage: `url('${cardItem.item.image}')` }" ></div>
            <div class="description"> 
              <div class="sub-text">{{cardItem.buyer}}</div>
              <div class="name">{{cardItem.item.name}}</div> 
            </div> 
          </div>
        </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <swiper v-else ref="mySwiper" :options="swiperOptions">
        Пока здесь пусто :(
      </swiper>

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

h2:not(.enable-padding):first-child {
    padding-top: 0;
}
h2 {
    font-size: 32px;
    font-weight: 900;
    margin: 0;
    padding-bottom: 40px;
    padding-top: 80px;
    /*line-height: 1;*/
    /* */
    text-align: initial;
    color: #333333
}
.sub-text {
    opacity: .3;
    text-transform: uppercase;
    font-size: 11.7px;
    font-weight: 700;
    line-height: 120%;
    display: block;
}
h2 > span {
    margin-top: 10px;
    line-height: 1;
}

/* ---------- Cards ---------- */
.clear-fix {
    position: relative;
}
.cards {
    /*margin-left: -20px;
    margin-top: -20px; */
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.cards.small {
    margin-left: -10px;
    margin-top: -10px;
    display: block;
    overflow: hidden;
}
.image {
  height: 18vw;
  max-height: 180px;
  /* */
  margin-top: 10px;
  background: #f0f0f0 no-repeat 50%;
  background-size: cover;
  position: relative;
  @media screen and (max-width: 480px) {
    height: 40vw;
  }
}
.card {
  overflow: hidden;

  .description {
    padding: 16px;
    text-align: initial;

    .sub-text {
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 18px;
      line-height: 22px;
      font-weight: 700;
      margin-bottom: 0;
      color: inherit;
    }
    @media screen and (max-width: 480px) {
      padding: 8px;
    }
  }
}

</style>
