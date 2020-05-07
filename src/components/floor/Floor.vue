<template>
  <div>
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floorData_0.image" width="100%">
        </div>
        <div>
          <div class="floor-two">
            <img :src="floorData_1.image" width="100%">
          </div>
          <div class="floor-three">
            <img :src="floorData_2.image" width="100%">
          </div>
        </div>
      </div>
      <div class="floor-normal">
        <div v-for="(item,index) in floorData.slice(3)" :key="index">
          <img :src="item.image" width="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Floor",
    props: ['floorData','floorTitle'],
    data() {
      return {
        floorData_0: {},
        floorData_1: {},
        floorData_2: {},
      }
    },
    created() {

    },
    watch: {
      floorData: function (val) {
        this.floorData_0 = this.floorData[0];
        this.floorData_1 = this.floorData[1];
        this.floorData_2 = this.floorData[2];
      }
    }
  }
</script>

<style scoped>
  .floor-title {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .floor-anomaly {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .floor-anomaly div {
    width: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #ddd;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;
  }
  .floor-normal {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .floor-normal div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
  }
  .floor-normal div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
</style>
