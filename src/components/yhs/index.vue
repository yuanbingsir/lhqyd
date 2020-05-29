<template>
  <iframe :src="this.urldz" id="myPlayer" allowfullscreen v-if="sxifram"></iframe>
</template>

<script>
export default {
  data() {
    return {
      player: "",
      cooker: "",
      urldz: "",
      yuntai: "",
      sxifram: false,
      startLimit: "",
      stattime: ""
    };
  },
  created() {
    // this.gettookin();
    if (!localStorage.getItem("cooker")) {
     this.gettookin()
    } else {
      this.cooker = localStorage.getItem("cooker");
    }
  },
  mounted() {},
  methods: {
    gettookin() {
      this.$http.post("https://open.ys7.com/api/lapp/token/get", {
        method: "post",
        data:
          "appKey=d1d839e1eee04b63908b1807a5bdba1a&appSecret=f863ca7459997202bfa7b4083dc2b1d5"
      }).then(res=>{
          localStorage.setItem('cooker', res.data.data.accessToken)
      })
    },
    openDetails(Serpentine) {
      this.yuntai = Serpentine[0].serial;
      if (Serpentine[0].serial === null) {
        this.sxifram = false;
      } else {
        this.sxifram = true;
      }
      this.urldz =
        "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" +
        Serpentine[0].serial +
        "/1.hd.live&autoplay=1&accessToken=" +
        this.cooker +
        "&begin=20200421&end=20200421";
    },
    init() {
      setTimeout(function() {
        this.player = new EZUIKit.EZUIPlayer("myPlayer");
      }, 20);
    }
  }
};
</script>

<style>
#myPlayer {
  height: 90vw;
  width: 100%;
}
</style>
