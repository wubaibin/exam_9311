<template>
  <div
    class="list"
    :style="
      value.type === 0 ? { padding: '5px 0 7px 0' } : { padding: '9px 0 16px 0' }
    "
    v-if="value.list"
  >
    <div class="header-container">
      <div class="title">{{ value.type_title }}</div>
      <div class="time-container" v-if="value.type === 0">{{ time }}</div>
    </div>
    <div class="swiper-container">
      <div
        class="item-container"
        v-for="item in value.list"
        v-bind:key="item.id"
      >
        <img
          :src="item.image === 'Slice1' ? Slice1 : Slice2"
          class="item-img"
          alt="图书"
        />
        <div class="item-title" v-if="value.type !== 0">
          {{ item.title | ellipsis(8) }}
        </div>
        <div class="price">
          <span style="font-size: 10px">¥</span>
          <span style="font-size: 12px">{{ item.price | takePrice(0) }}.</span>
          <span style="font-size: 10px">{{ item.price | takePrice(1) }}</span>
        </div>
        <template v-if="value.type === 0">
          <div class="price-line">¥{{ item.price_line }}</div>
          <div class="progress-container">
            <div class="progress" :style="{ width: item.progress }"></div>
          </div>
          <div class="progress-text">已抢{{ item.progress }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const Slice1 = require("../assets/Slice1.png");
const Slice2 = require("../assets/Slice2.png");
import Vue from "vue";

Vue.filter("ellipsis", (value, saveLength) => {
  if (value.length >= saveLength + 1) {
    return value.slice(0, saveLength) + "...";
  }
  return value;
});
Vue.filter("takePrice", (value, place) => {
  return value.split(".")[place];
});

export default {
  name: "BookList",
  props: {
    value: Object,
  },
  data() {
    return {
      Slice1,
      Slice2,
      time: "",
    };
  },
  mounted() {
    this.Time();
  },
  created() {},
  methods: {
    countDown() {
      if (this.value.type !== 0) {
        return;
      }
      const lastTime = this.value.lastTime;
      const diff = new Date(lastTime).getTime() - new Date().getTime();
      if (diff < 0) {
        this.time = "活动已结束";
        return;
      }
      const days = Math.floor(diff / (24 * 3600 * 1000));
      const diffHour = diff % (24 * 3600 * 1000);
      const hours = Math.floor(diffHour / (3600 * 1000));
      const diffMin = diffHour % (3600 * 1000);
      const minutes = Math.floor(diffMin / (60 * 1000));
      const second = parseInt((diff / 1000) % 60, 10);
      this.time = `倒计时 ${
        days === 0 ? hours : days * 24 + hours
      }:${minutes}:${second}`;
    },
    Time() {
      setInterval(() => {
        this.countDown();
      }, 1000);
    },
  },
};
</script>
<style lang='scss' scoped>
@media screen and (max-width: 768px) {
}

.list {
  margin-top: 16px;
  border-radius: 6px;
  background-image: linear-gradient(#ffe2d2, #ffffff, #ffffff);
  .header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    .title {
      font-size: 16px;
      color: #000000;
      font-weight: 700;
      margin-left: 11px;
    }
    .time-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 11px;
      padding: 0 16px;
      height: 16px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 700;
      background: #f8887d;
      color: #ffffff;
    }
  }
  .swiper-container::-webkit-scrollbar {
    display: none;
  }
  .swiper-container {
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .item-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .item-img {
      width: 82px;
      height: 91px;
    }
    .item-title {
      width: 60px;
      font-size: 10px;
      color: #000000;
      font-weight: 600;
    }
    .price {
      color: #dc0000;
      font-weight: 700;
    }
    .price-line {
      color: #acacac;
      font-size: 8px;
      text-decoration: line-through;
      margin-top: 3px;
    }
    .progress-container {
      width: 52px;
      height: 2px;
      background: #ffeaea;
      border-radius: 10px;
      margin-top: 3px;
    }
    .progress {
      height: 2px;
      border-radius: 10px;
      background-image: linear-gradient(to right, #ff6523, #da0000);
    }
    .progress-text {
      color: #acacac;
      font-size: 8px;
      font-weight: 600;
      margin-top: 2px;
    }
  }
}
</style>
