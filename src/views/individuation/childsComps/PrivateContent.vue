<template>
  <div :class="program + 'pricontent'">
    <h4 :class="[`${program + 'priva-cont-h4'}`,`${program + 'priva-cont-h4-'+ theme}`]">独家放送</h4>
    <div class="pricontent-container">
        <div class="pricontent-item" v-for="(item,index) in privatecont" :key="index">
          <i></i>
          <img v-lazy="item.picUrl||item.SPicUrl" @load="handleRefresh"/>
          <div
              class="pricontent-name"
              :class="[`${program + 'pricontent-name-' + theme}`]"
          > {{ item.name }}
            </div>
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "private-content",
  props: {
    privatecont:{
      type:Array,
      default:[],
    },
  }
}
</script>

<style scoped lang="less">
.dance-music-pricontent{
  width: 100%;
  .pricontent-container{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .pricontent-item{
      width: 35%;
      padding: 0 10px;
      img{
        width: 100%;
      }
      .pricontent-name{
        font-size: 0.8em;
      }
    }
  }
}
</style>