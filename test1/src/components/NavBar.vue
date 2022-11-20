<template>
  <div class="nav-container">
    <img src="../assets/ic_back.png" alt="返回" class="container-filter" />
    <div class="title">{{ title }}</div>
    <div class="container-filter"></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: String,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.nav-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  height: 44px;
  background: #fff;
  .container-filter {
    width: 28px;
    height: 28px;
  }
  .title {
    font-size: 17px;
    color: #000000;
    font-weight: 600;
  }
}
</style>
