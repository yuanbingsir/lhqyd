<template>
  <div>
    <div style="height:8vw"></div>
    <van-row type="flex">
      <van-col span="7">
        <van-dropdown-menu style="width:22vw;margin-left:2vw;">
          <van-dropdown-item v-model="value1" :options="work1" @change="screen" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="14">
        <van-cell-group
          style="width:55vw;font-size:12vw;height: 8vw;background-color:rgb(32,39,67);border-radius: 5vw;border:0"
        >
          <van-field v-model="value" placeholder="请输入设备名或编号" @input="myChange" />
        </van-cell-group>
      </van-col>
      <van-col span="3">
        <van-icon name="apps-o" color="#1082b8" size="9vw" />
      </van-col>
    </van-row>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div
        style="height:30vw;background-color:rgb(48,48,72);margin:2vw;"
        v-for="item in list1"
        :key="item.id"
        @click="getDescribe(item.equipmentNumber)"
      >
        <van-row>
          <van-col>
            <van-icon
              name="passed"
              size="7vw"
              style="margin-top:3vw;margin-left: 5vw;margin-right:2vw;"
              color="green"
              v-if="item.state"
            />
            <van-icon
              name="close"
              size="7vw"
              style="margin-top:3vw;margin-left: 5vw;margin-right:2vw;"
              color="red"
              v-if="!item.state"
            />
          </van-col>
          <van-col>
            <h3 style="color:#fff;font-size:4.5vw;margin-top:3vw">{{item.equipmentName}}</h3>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col span="12">
            <p
              style="margin:0vw 2vw 1vw 5vw;font-size:2vw;color:#9493A4;"
            >编号：{{item.equipmentNumber}}</p>
          </van-col>
          <van-col spam="12">
            <p style="margin:0vw 9vw 1vw 5vw;font-size:2vw;color:#9493A4;">压力：{{item.pressure}}</p>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col span="12">
            <p
              style="margin:0vw 2vw 1vw 5vw;font-size:2vw;color:#9493A4;"
            >温度：{{item.tempA}}/{{item.tempB}}</p>
          </van-col>
          <van-col spam="2">
            <p style="margin:0vw 9vw 1vw 5vw;font-size:2vw;color:#9493A4;">硫化氢浓度：{{item.h2s}}</p>
          </van-col>
        </van-row>
        <p style="margin:0vw 15vw 1vw 5vw;font-size:2vw;color:#9493A4;">数据更新时间：{{item.updateTime}}</p>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "home",
  data() {
    return {
      list: [],
      work: [],
      value1: 0,
      work1: [],
      value: "",
      list1: [],
      work2: [],
      isLoading: false,
      list2: [],
      list3: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    myChange(e) {
      this.list1 = this.list.filter(item => {
        if (item.equipmentName !== null) {
          return (
            item.equipmentNumber.includes(e) || item.equipmentName.includes(e)
          );
        }
      });
    },
    getDescribe(id) {
      this.$router.push({
        path: `/details/${id}`
      });
    },
    onRefresh() {
      this.getList();
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    getList() {
      let pro = this.$http.get(
        "/hcd/rest/osdDeviceController/queryOsdDevice"
      );
      pro.then(res => {
        if (res.data.ok) {
          this.list = res.data.data;
          this.list.forEach(item => {
            this.work.push(item.workArea);
            if (item.equipmentStatus === "1") {
              item.state = true;
            } else if (item.equipmentStatus === "0") {
              item.state = false;
            }
          });
          // this.work = [...new Set(this.work)];
          var newArr = [];
          newArr.push("全部");
          for (var a = 0; a < this.work.length; a++) {
            for (var j = a + 1; j < this.work.length; j++) {
              if (this.work[a] === this.work[j]) {
                a++;
                j = a;
              }
            }
            newArr.push(this.work[a]);
          }
          // console.log(newArr)
          this.work = newArr;
          var i = 0;
          this.work.forEach(item => {
            this.work1.push({ text: item, value: i++ });
          });
          this.screen();
        }
      });
    },
    screen() {
      if (this.value1 === 0) {
        this.list1 = this.list
      } else {
         this.work2 = this.work1.filter(item => {
        return item.value === this.value1;
      });
      // console.log(this.work2);
      this.list1 = this.list.filter(item => {
        return item.workArea.includes(this.work2[0].text);
      });
      }
     
    }
  }
};
</script>

<style  lang="less">
.van-dropdown-menu__bar {
  height: 8vw !important;
  background-color: rgb(22, 68, 106) !important;
  border-radius: 5vw;
  .van-dropdown-menu__item {
    .van-dropdown-menu__title {
      color: #fff !important;
    }
  }
}
.van-popup {
  background-color: rgb(22, 68, 106) !important;
}
.van-popup--top {
  width: 40% !important;
  color: #fff;
  border-radius: 0vw !important;
}
.van-cell {
  color: #fff;
  height: 8vw !important;
  padding: 1vw 5vw !important;
  padding-left: 7vw !important;
  padding-right: 1vw !important;
  border-radius: 5vw !important;
  background-color: rgb(32, 39, 67) !important;
  .van-field__control {
    font-size: 5vw !important;
    color: #fff;
  }
}
.van-hairline--top-bottom::after {
  border-width: 0 !important;
}
.van-dropdown-item__option--active {
  color: green;
}
</style>