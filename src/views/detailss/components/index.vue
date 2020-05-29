<template>
  <div id="Sharingrouter">
    <div id="container" ref="container"></div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  data() {
    return {
      marker: "",
      longitude: "",
      latitude: "",
      map: ""
    };
  },
  mounted() {},
  created() {
  },
  methods: {
    openDetails1(id) {
    // console.log(id);
      this.longitude = id[0].latitude
      this.latitude = id[0].longitude
      this.init()
    },
    init() {
      var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [this.longitude, this.latitude], // 地图中心点
        mapStyle: "amap://styles/e19dbb1c036a21fa7d32933824f891f0"
      });
      var marker = new AMap.Marker({
        icon: "//vdata.amap.com/icons/b18/1/2.png",
        position: [this.longitude, this.latitude]
      });
      map.add(marker);
    }
  }
};
</script>

<style>
#container {
  height: 70vw;
}
.amap-info-content {
  background-color: rgb(59, 222, 254);
  color: #fff;
}
</style>
