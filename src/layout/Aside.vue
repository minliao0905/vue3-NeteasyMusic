<template>
    <div :class="asideClass">
      <div class="menu" ref="menu">
          <el-menu
              mode="vertical"  item-height="50px"
              :text-color="theme =='dark'? 'var(--dark-text-color)' :'' "
              :active-text-color="getActiveColor"
              :background-color="theme =='dark'? 'var(--dark-color)' :'' "
              router
          >
             <el-menu-item v-for="(item,index) in menuList" :key="index" :index="item.link" >
               <template #title>
                 <i :class="item.icon"></i>
                 <span>{{ item.content }}</span>
               </template>
             </el-menu-item>
          </el-menu>
<!--        创建的歌单列表，显示图片和歌单名字-->
<!--        <div class="my-music-list" @mouseenter="handleRefresh" v-if="playList.length">-->
<!--             <p class="title">创建的歌单</p>-->
<!--          <Scroll class="aside-scroll" ref="scroll">-->
<!--            <ul class="my-music-list-main">-->
<!--              <li  v-for="(item,index) in playList" :key="index"  @click="enterMusicListDetail(index)">-->
<!--                <img :src="item.coverImgUrl" alt=""/>-->
<!--                <div class="my-music-list-main-name">{{item.name}}</div>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </Scroll>-->
<!--        </div>-->
      </div>
    </div>
</template>

<script>
import {theme} from "@/mixin/global/theme.js";
import Scroll from "@/components/common/Scroll";
import {mapState} from 'vuex'
export default {
  name: "LayoutAside",

  mixins:[theme],
  data() {
    return {
      menuList: [
        {
          link: "/individuation",
          icon: "iconfont icon-music",
          content: "个性推荐",
        },
        { link: "/AllMusicList", icon: "iconfont icon-gedan", content: "歌单" },
        {
          link: "/ranklist",
          icon: "iconfont icon-PCbofangye_paihangbang",
          content: "排行榜",
        },
        {
          link: "/artist-list",
          icon: "iconfont icon-mansingle",
          content: "歌手",
        },
        { link: "/mv", icon: "iconfont icon-shipin", content: "MV" },
        // { link: "/mv-list", icon: "iconfont icon-MV", content: "全部MV" },
        {
          link: "/new-songs",
          icon: "iconfont icon-musicnoteeighth",
          content: "最新音乐",
        },
      ],

    };
  },
  components:{Scroll},
  computed:{
    asideClass(){
      return [`${this.program + "aside"}` , `${this.program + "aside-" + this.theme}`]
    },
    ...mapState({
      // playList:(state)=>state.musiclist.Playlist,
    }),

  },
  methods:{
    // getPriPlayList() {
    //   this.priplayList=[];
    //     for (let i in playList) {
    //       let priplayList = new PlayList(playList[i]);
    //       this.priplayList.push(playList);
    //       if (i == playlist.length - 1) {
    //         // localStorage目前只能存储字符串，想存储复杂类型可行要使用JSON.stringify(this.playList)格式转换
    //         localStorage.setItem("playList", JSON.stringify(this.playList));
    //       }
    //     }
    //   });
    // },
  },
  mounted() {
    // this.$store.dispatch("getPlaylist")
  },
  watch:{
    getUserId(){
      // this.getPriPlayList();
      console.log("获取当前的PriPlayList")
    }
  }
}
</script>

<style scoped lang="less">
.dance-music-aside {
  height: calc(100% - 58px - 60px);
  width: 18%;
  float: left;
  padding-left: 1px;
  &-light {
    background: var(--light-aside-bg-color);
  }
  &-dark {
    background: var(--dark-aside-bg-color);
    color: var(--dark-text-color);
  }
  &-green {
    background: var(--green-aside-bg-color);
  }
  .el-menu{
    width: 100%;
    i{
      padding-left: 1px;
    }
    span{
      padding-left: 10px;
    }
    .is-active{
      border-left: 3px solid var(--main-color);
    }
  }
}
.aside-scroll {
  height: calc(50% -60px);
}
.my-music-list {
  height: calc(50% -60px);
  padding: 10px 0px;

  .title {
    font-size: 13px;
  }

  &-main {
    list-style-type: none;
    padding-left: 20px;

    li {
      height: 30px;
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;

      img {
        height: 80%;
        border-radius: 2px;
      }
    }

    &-name {
      padding: 0px 10px;
    }
  }
}

</style>