<template>
   <div class="base-info"  >
     <div class="base-left">
       <el-avatar :src="baseInfo.img" :size="160" shape="square"/>
     </div>
     <div class="base-right">
         <div class="base-item">
           <el-tag class="con-i">歌单</el-tag>
           <h4 :class="[`${this.program+ 'baseinfo-h4'}`,`${this.program+'baseinfo-h4-'+ theme}`]">{{baseInfo.name}}</h4>
         </div>
        <div class="base-item">
             <el-avatar   :src="baseInfo.creatorAvatar" ></el-avatar>
             <div class="c-item">{{baseInfo.creatorName}}</div>
             <div class="c-item">创建时间：{{getCreateDate}}</div>
        </div>
        <div class="base-item">
           <el-button  :style="{border:`none`}"
                       round
                       class="button"
                       @click = "handlePlayMusic"
                       >  <i class="iconfont icon-bofang" />播放全部</el-button>
          <el-button round class="button">
            <i class="iconfont icon-shoucang" />
            收藏({{baseInfo.subscribedCount}})
          </el-button>
          <el-button round class="button">
            <i class="iconfont icon-fenxiang" />
            分享({{baseInfo.shareCount}})
          </el-button>
        </div>
       <div class="base-item" style="font-size: 13px;margin-top:10px">
         <div class="desc">
           <p>标签：
             <span>{{getTags}}</span>
           </p>
           <p class="desc-title">简介：{{baseInfo.title}}</p>
         </div>
       </div>
       <div class="con-infonum base-item">
         <div class="infonum1">歌曲数 <br>{{baseInfo.trackCount}}</div>
         <div class="infonum2">播放数<br> {{getPlayCount}}</div>
       </div>
     </div>

   </div>

</template>
<script>
import {formatDate} from "@/utils/tool";

export default {
  name: "BaseInfo",
  props: {
    baseInfo: {
      type: Object,
      default: {},
    },
  },
  computed:{
    getCreateDate(){
      return formatDate(new Date(this.baseInfo.createTime),"yyyy-MM-dd");
    },
    getTags(){
      return this.baseInfo.tags && this.baseInfo.tags.join("/");
    },
    getPlayCount(){
      return (
          this.baseInfo.playCount &&
          this.baseInfo.playCount.toString().slice(0, 2) + "万"
      )
    }
  },
  methods:{
    handlePlayMusic(){
        this.$emit("PlayMusic" );

    }
  }
};
</script>
<style lang="less" scoped>
.base-info{
  width: 100%;
  padding: 10px ;
  display: flex;
  overflow: hidden;
  .base-left{
    width: 200px;
    .el-avatar{
     margin: 10px;
    }
  }
  .base-right{
    flex: 1;
     padding-top: 10px;
    .base-item{
      display: flex;
      .el-tag{
        color:var(--main-color);
        border: 1px solid var(--main-color);
        background: none;
        font-weight: bolder;
      }
      .el-avatar{
        margin-top: 10px;
        margin-right: 10px;
      }
      h4{
        padding:0px 10px;
      }
      .c-item{
        margin:10px 5px ;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      .button{
        margin-right: 15px;
        padding: 20px 30px;
        color: #312828;
      }
      .button:nth-child(1){
        background: var(--main-color) ;
          color: #fff ;
      }
    }

  }
  .con-infonum{
    position: relative;
    right: -80%;
    top: -200px;
    font-size: 13px;
    padding-top: 10px;
    height: 50px;
    .infonum1{
      padding-right: 3px;
      height: 100%;
      border-right: 1px solid #e5d9d9;
    }
    .infonum2{
      padding-left: 3px;
    }
  }
  .desc {
    padding: 10px 0px;
    font-size: 13px;
    position: relative;
    top: -20%;
    span {
      color: var(--tag-color);
    }
    &-title {
      padding-top: 5px;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .play {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 13px;
    &-left {
      padding: 5px;
      border-right: 1px solid var(--border);
    }
    &-right {
      padding: 5px;
    }
  }
}
</style>