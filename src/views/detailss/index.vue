<template>
  <div>
    <van-tabs v-model="active" @change="onChange">
      <!-- // 基本信息加地图 -->
      <van-tab title="基本信息">
        <map111 ref="map111"></map111>
        <div style="height:50vw;background-color:rgb(48,48,72);margin:2vw;" v-if="this.list[0]">
          <van-row>
            <van-col>
              <van-icon
                name="passed"
                size="7vw"
                style="margin-top:3vw;margin-left: 5vw;margin-right:2vw;"
                color="green"
                v-if="this.list[0].state"
              />
              <van-icon
                name="close"
                size="7vw"
                style="margin-top:3vw;margin-left: 5vw;margin-right:2vw;"
                color="red"
                v-if="!this.list[0].state"
              />
            </van-col>
            <van-col>
              <h3 style="color:#fff;font-size:4.5vw;margin-top:3vw">{{this.list[0].equipmentName}}</h3>
            </van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col span="12">
              <p
                style="margin:0vw 2vw 1vw 5vw;font-size:3vw;color:#9493A4;"
              >编号：{{this.list[0].equipmentNumber}}</p>
            </van-col>
          </van-row>
          <van-row>
            <van-col spam="12">
              <p
                style="margin:0vw 9vw 1vw 5vw;font-size:3vw;color:#9493A4;"
              >压力：{{this.list[0].pressure}}</p>
            </van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col span="12">
              <p
                style="margin:0vw 2vw 1vw 5vw;font-size:3vw;color:#9493A4;"
              >温度：{{this.list[0].tempA}}/{{this.list[0].tempB}}</p>
            </van-col>
          </van-row>

          <p style="margin:0vw 9vw 1vw 5vw;font-size:3vw;color:#9493A4;">硫化氢浓度：{{this.list[0].h2s}}</p>

          <p
            style="margin:0vw 15vw 1vw 5vw;font-size:3vw;color:#9493A4;"
          >校正系数A/B：{{this.list[0].equipmentA}},{{this.list[0].equipmentB}}</p>
          <p
            style="margin:0vw 15vw 1vw 5vw;font-size:3vw;color:#9493A4;"
          >GPS：{{this.list[0].latitude}},{{this.list[0].longitude}}</p>
          <p
            style="margin:0vw 15vw 1vw 5vw;font-size:3vw;color:#9493A4;"
          >数据更新时间：{{this.list[0].updateTime}}</p>
        </div>
      </van-tab>
      <!-- 历史记录时间选择加表格 -->
      <van-tab title="历史记录">
        <div class="chart-wrapper">
          <canvas id="mountNode"></canvas>
        </div>
        <div
          style="height:8vw;width:60vw;background-color:#182649;border-radius:2vw;margin-top:2vw;margin-left:3vw"
          @click="seletime"
        >
          <van-row>
            <van-col>
              <van-icon name="notes-o" size="7vw" color="#0F92D0" style="margin-left:3vw" />
            </van-col>
            <van-col>
              <div
                style="height:8vw;line-height:8vw;color:#0F93CF;margin-left:2vw;"
              >{{this.stattime}}——{{this.stattime1}}</div>
            </van-col>
          </van-row>
        </div>
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="请输入开始时间"
          :min-date="minDate"
          :max-date="maxDate"
          v-if="timestatc"
          @confirm="seletrue"
          @cancel="timestatc = false"
          style="position: fixed;bottom: 0;width:100%"
        />
        <van-datetime-picker
          v-model="currentDate1"
          type="datetime"
          title="请输入结束时间"
          :min-date="minDate"
          :max-date="maxDate"
          v-if="timestatc1"
          @confirm="seletrue1"
          @cancel="timestatc1 = false"
          style="position: fixed;bottom: 0;width:100%"
        />
        <div style="background-color:#202743;margin:3vw;color:#fff;padding-top:1vw;">
          <div
            style="background-color:#19466D;height:10vw;line-height:10vw;margin:3vw 3vw 0vw 3vw;padding-left:3vw"
          >
            <van-row gutter="20">
              <van-col span="5">压力</van-col>
              <van-col span="8">硫化氢浓度</van-col>
              <van-col span="8">更新时间</van-col>
            </van-row>
          </div>
          <div
            style="height:8vw;line-height:8vw;margin: 0vw 3vw 3vw 3vw;padding-left:3vw"
            v-for="item in histlist"
            :key="item.id"
          >
            <van-row gutter="20">
              <van-col span="5">{{item.pressure}}</van-col>
              <van-col span="7">{{item.h2s}}</van-col>
              <van-col span="10">{{item.updateTime}}</van-col>
            </van-row>
          </div>
        </div>
      </van-tab>
      <!-- 萤石云摄像头 -->
      <van-tab title="视频监控">
        <yhs ref="yhs" v-if="yysy"></yhs>
        <h1 style="color:#fff;text-align:center;" v-if="!yysy">该设备暂无摄像头</h1>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import map111 from "./components/index.vue";
import yhs from "../../components/yhs/index.vue";
import F2 from "@antv/f2/lib/index-all";
export default {
  name: "detailss",
  components: {
    map111,
    yhs
  },
  data() {
    return {
      list: [], // 指定设备实时数据
      histlist: [], //按时间查找的数据
      active: 0,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      stattime: "",
      timestatc: false,
      timestatc1: false,
      currentDate1: new Date(),
      stattime1: "",
      stattime2: "",
      stattime3: "",
      yysy: true,
      currentPage: 1
    };
  },
  created() {
    this.getAppoint();
    this.filters();
  },
  methods: {
    // 图标数据
    gittubiao() {
      var data = [];
      this.histlist.forEach(item=>{
        data.push({ day: item.updateTime, value: item.h2s });
      })
      console.log(this.histlist);
      
      var chart = new F2.Chart({
        id: "mountNode",
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        //value和day都是根据模拟数据的属性来配置的，所以这里的value和day是可以更改的，具体根据后台数据属性来
        value: {
          tickCount: 5,
          min: 0
        },
        day: {
          range: [0, 1]
        }
      });
      chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: function onShow(ev) {
          var items = ev.items;
          items[0].name = null;
          // items[0].value = "$ " + items[0].value;
        }
      });
      chart.line().position("day*value"); //配置图表样式
      chart
        .point()
        .position("day*value")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      chart.axis("day", {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        }
      });
      chart
        .point()
        .position("day*value")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      chart.render();
    },
    onChange() {
      if (this.active === 2) {
        setTimeout(() => {
          if (this.list[0].serial !== null) {
            this.$refs.yhs.openDetails(this.list);
          }
        }, 20);
      } else if (this.active === 1) {
        this.geitimelist();
      }
    },
    // 按时间请求历史数据
    geitimelist() {
      this.stattime2 =
        this.currentDate.getFullYear() +
        "-" +
        (this.currentDate.getMonth() + 1) +
        "-" +
        (this.currentDate.getDate() - 7) +
        " " +
        this.checkTime(this.currentDate.getHours()) +
        ":" +
        this.checkTime(this.currentDate.getMinutes()) +
        ":" +
        this.checkTime(this.currentDate.getSeconds());
      this.stattime3 =
        this.currentDate1.getFullYear() +
        "-" +
        (this.currentDate1.getMonth() + 1) +
        "-" +
        this.currentDate1.getDate() +
        " " +
        this.checkTime(this.currentDate1.getHours()) +
        ":" +
        this.checkTime(this.currentDate1.getMinutes()) +
        ":" +
        this.checkTime(this.currentDate1.getSeconds());

      let pro = this.$http.get(
        "/hcd/rest/osdDeviceHistoryController/queryOsdDeviceHistory?equipmentNumber=" +
          this.list[0].equipmentNumber +
          "&updateStart=" +
          this.stattime2 +
          "&updateDown=" +
          this.stattime3
      );
      pro.then(res => {
        if (res.data.ok) {
          this.histlist = res.data.data;
          // console.log(this.histlist);
                  this.gittubiao();
        }
      });
    },
    // 时间过滤
    filters() {
      this.stattime =
        this.currentDate.getFullYear() +
        "" +
        "-" +
        (this.currentDate.getMonth() + 1) +
        "-" +
        this.checkTime(this.currentDate.getDate() - 7);
      this.stattime1 =
        this.currentDate1.getFullYear() +
        "" +
        "-" +
        (this.currentDate1.getMonth() + 1) +
        "-" +
        this.checkTime(this.currentDate1.getDate());
    },
    // 结束时间确定按钮
    seletrue1() {
      this.timestatc1 = false;
      this.filters();
      this.geitimelist();
    },
    seletime() {
      this.timestatc = true;
    },
    // 开始时间确定按钮
    seletrue() {
      this.timestatc = false;
      this.timestatc1 = true;
      this.filters();
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    getAppoint() {
      let pro = this.$http.get(
        "/hcd/rest/osdDeviceController/queryOsdDevice?equipmentNumber=" +
          this.$route.params.id
      );
      pro.then(res => {
        if (res.data.ok) {
          this.list = res.data.data;
          this.$refs.map111.openDetails1(this.list);
          this.list.forEach(item => {
            if (item.equipmentStatus === "1") {
              item.state = true;
            } else if (item.equipmentStatus === "0") {
              item.state = false;
            }
          });
          if (this.list[0].serial === null) {
            this.yysy = false;
          }
        }
      });
    }
  }
};
</script>

<style>
.van-tabs__nav {
  background-color: rgb(14, 21, 47) !important;
}
.van-tab--active {
  color: #fff !important;
}
.van-pagination__item {
  height: 8vw;
  width: 12vw;
}
.van-pagination__next {
  width: 12vw;
}
.chart-wrapper {
  height: 70vw;
  width: 100%;
}
#mountNode {
  width: 100%;
  height: 70vw;
}
</style>