<template>
  <div>
      <router-view></router-view>
    <van-tabbar v-model="active" :placeholder="true" @change="onChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o">通知</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  naem: "sid",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onChange(index) {
      if (index === 0) {
        this.$router.push({
          path: `/home`
        });
      } else if (index === 2) {
        this.$router.push({
          path: `/individual`
        });
      } else {
        this.$router.push({
          path: `/notice`
        });
        
      }
    }
  }
};
</script>

<style>
.van-tabbar {
  background-color: rgb(26, 25, 56) !important;
}
</style>