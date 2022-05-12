<template>
    <div :class="detailClass">
      <BaseInfo :base-info="baseInfo" @playMusic="playMusic"></BaseInfo>
      <el-menu   mode="horizontal">
        <el-menu-item v-for="(item,index) in list" :key="index" :index="index+''" @click="handleMenuClick">
          <template #title>
            <el-button  style="border:none; width:50%">{{item}}</el-button>
          </template>
        </el-menu-item>
      </el-menu>
      <div :class="program + 'detail-container'">
        <song-list
            ref="songList"
            :music-list="musicList"
            :length="length"
            v-show="isShow=='music'"
        />
        <div class="detail-container-recommend" v-show="isShow=='recommend'">
           <Recommends ref="recommend" :recommends="recommends" :id="id">
             <div class="recommends-bottom">
               <el-pagination></el-pagination>
             </div>
           </Recommends>
        </div>
      </div>
      <music-list-live :subs="subs" v-show="isShow=='sub'">
      </music-list-live>
    </div>
</template>

<script>
import BaseInfo from "@/views/musiclist-detail/childComps/baseinfo";
import {mapGetters} from 'vuex'
import {_getSongsDetail, _getRecommends, baseInfo, songDetail, _getSub} from "@/api/detail";
import SongList from "@/components/common/songlist";
import Recommends from "@/views/musiclist-detail/childComps/Recommends";
import MusicListLive from "@/views/musiclist-detail/childComps/MusicListLive";
import {playMusic} from "@/mixin/global/play-music";
export default {
  name: "MusicListDetail",
  components:{BaseInfo,SongList,Recommends,MusicListLive},
  mixins:[playMusic],
  data(){
    return {
      id: null,
      limit: 5,
      offset: 1, //分页
      list: [],
      baseInfo: {},
      musicList:[],
      isShow: "music", //控制显示歌单、评论、收藏者
      recommendsCount:0,//歌单评论数
      subs: null,
      length: null, //获取歌曲列表长度，用于刷新scroll
      recommends:null,
    };
  },

  methods:{
    init() {
      this.limit = 5;
      this.list = [];
      this.baseInfo = {};
      this.musicList = [];
      this.isShow = "music"; //控制显示歌单、评论、收藏者
      this.recommends = null;
      this.subs = null;
    },
    handleMenuClick({index}){

      switch(index){
        case '0':this.isShow = "music"; break;
        case '1':this.isShow = "recommend";break;
        case '2':this.isShow = "sub" ; break;
      }
    },
    async getDetaiRequestDate() {
      this.id = this.$route.params.id;
      if (!this.id) return;
      this.init();
      //获取musicdetail 数据
      await this.$store.dispatch('getMusicdetailList', this.id);
      // console.log(this.getDetailplaylist)
      //获取歌单基础信息
      this.baseInfo = new baseInfo(this.getDetailplaylist)
      //获取歌单的评论数
      this.recommendsCount = this.getDetailplaylist.commentCount;
      // 菜单
      this.list= ["歌曲列表","评论（"+this.recommendsCount+")","收藏者"]
      //获取歌单列表详细信息
      const trackIds = this.getDetailplaylist.trackIds;
      let length =  trackIds.length;
      if(length){
        for(let i=0,length= trackIds.length;i<length;i++){
          _getSongsDetail( trackIds[i].id).then((res)=>{
            let song = new songDetail(res.data.songs)
            this.musicList.push(song);
          })
        }
      }
    //  获取评论
      this.getRecommends();

    //  获取收藏者
     this.getSubs();
    },
    getRecommends(){
      _getRecommends(this.id,this.limit,this.offset).then((res)=>{
        this.recommends = res.data.comments;
      })
    },
    getSubs(){
      _getSub(this.id, 10).then((res) => {
        this.subs = res.data.subscribers;
      });
    }
  },
   created() {
     this.getDetaiRequestDate();
   },
  computed:{
    ...mapGetters(["getDetailplaylist"]),
    detailClass(){
      return [`${this.program + "detail"} `,`${this.program + "detail-" + this.theme}`]
    },

  },

}
</script>

<style scoped lang="less">

</style>