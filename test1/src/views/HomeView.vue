<template>
  <div class="container">
    <NavBar title="天天读书" />
    <div style="padding: 0 10px">
      <BookList :value="hot"></BookList>
      <BookList :value="child"></BookList>
      <BookList :value="law"></BookList>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BookList from "@/components/BookList.vue";

export default {
  name: "HomeView",
  components: {
    NavBar,
    BookList,
  },
  data() {
    return {
      hot: {},
      child: {},
      law: {},
    };
  },
  created() {
    this.getHotBook();
    this.getChildBook();
    this.getLawBook();
  },
  methods: {
    async getHotBook() {
      const res = await this.axios({
        url: "http://localhost:3003/hot",
      });
      this.hot = res.data;
    },
    async getChildBook() {
      const res = await this.axios({
        url: "http://localhost:3003/child",
      });
      this.child = res.data;
    },
    async getLawBook() {
      const res = await this.axios({
        url: "http://localhost:3003/law",
      });
      this.law = res.data;
    },
  },
};
</script>
<style lang='scss' scoped>
.container {
  height: 100vh;
  background: #f7f6f6;
  overflow: hidden;
}
</style>
