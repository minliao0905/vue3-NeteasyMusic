<template>
  <div :class="program + 'newsongs'">
      <div class="newsongs-header">
          <h4 :class="[`${program + 'newsong-h4'}`,`${program + 'newsongs-h4'}`]">最新音乐</h4>
          <hr/>
      </div>
    <div class="newsongs-body">
       <div class="newsongs-item" v-for="(item,index) in musicList" :key="index">
          <span class="item-index">{{index+1}}</span>
          <img v-lazy="item.picUrl" class="item-img"/>
         <div class="item-info">
            <div class="item-name">{{item.name}}</div>
            <div class="item-bottom">{{ item.song.album.company }}</div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewSongs",
  props:{
    musicList: {
      type:Array,
      default:[]
    },
  },
}
</script>

<style scoped lang="less">
.dance-music-newsongs{
  width: 100%;
  .newsongs-body{
    width: 100%;
    display: grid;
    grid-template-columns:repeat(2,1fr) ;
  }

  .newsongs-item {
     display: flex;
      margin: 10px 10px;
    .item-img{
       width: 50px;
      height: 50px;
    }
    .item-index{
      text-align: center;
      height: 22px;
      width: 30px;
      top: 30px;
      position: relative;
      margin: 0 10px;
      font-size:14px ;
    }
    .item-info{
      width: 100px;
      font-size:12px ;
      padding-left: 10px;
      .item-name{
        height:20px;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-bottom{
        margin-top: 15px;
        width: 100px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

</style>