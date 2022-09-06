<template>
    <div :class="[`${program + 'all-musiclist'}`]">
        <el-popover :popper-class=" [`${program + 'ml-popover'}`,
                  `${program + 'ml-popover' + theme}`,]"
                    :effect="getTheme"
                    placement="bottom-start"
                    trigger="click"
                    width="500px"
                    ref="popover"
        >
          <template #reference>
            <div
                :class="[`${program + 'ml-popover-re'}`,`${program + 'ml-popover-re-' + theme}`,]"
            >
               <span>{{ cat }}</span>
            </div>
          </template>
          <div slot="title">
            <h4 class="pop-title">全部歌单分类</h4>
            <hr/>
          </div>
          <div slot="content">
            <scroll class="pop-scroll" ref="scroll">
              <div :class="['pop-container',`${'pop-container-'+theme}`]"
              >
                <el-button class="pop-all-button">全部歌单</el-button>
                <div class="pop-item" v-for="(item,index) in list" :key="index">
                  <div class="pop-item-left">
                    <i :class="['iconfont',`${iconList[index]}`]"></i>
                    <span>{{categories[index]}}</span>
                  </div>
                  <div class="pop-item-right">
                    <el-button v-for="(cate,index2) in  item" :key="index2"
                               width="80px"
                               height="35px"
                    @click="handleButtonClick(index,index2)"
                    >{{cate.name}}</el-button>
                  </div>
                </div>
              </div>
            </scroll>
          </div>
        </el-popover>

        <div class="all-musiclist">
          <card-group :card-list="playList" :num=40></card-group>
        </div>
        <div class="all-musiclist-bottom">
          <el-pagination
              :page-count="20"
              @current-change="onPageChange"
              v-model:current-page="offset"
            >
          </el-pagination>
        </div>

    </div>
</template>

<script>
import Scroll from "@/components/common/Scroll";
import {theme} from "@/mixin/global/theme";
import {_getCatList, _getMusicListHot, _getPlayList} from "@/api/music-list";
import cardGroup from "@/components/content/MusicCard/CardGroup";
import {mapState} from "vuex";
export default {
  name: "AllMusicList",
  components: {Scroll,cardGroup},
  mixins:[theme],
  data(){
    return {
      categories:[],
      list:[],
      iconList:[
        "icon-global",
        "icon-music",
        "icon-kafei",
        "icon-biaoqing",
        "icon-huatizhuti",
      ],
      hotTags:[],
      limit:20,
      offset:1,
      cat:"全部",
      isWheel:false,
      isPopover:false,
      playList:[]
    }
  },
   created(){
    _getCatList().then((res)=>{
      // console.log(res.data);
        this.categories = Object.values(res.data.categories);
        let  subs = res.data.sub;
        //将subs分类，分到对应的list 中。利用filter对象
        for(let i=0;i<Object.keys(this.categories).length;i++){
          this.list[i] = subs.filter((item)=>{
            return item.category == i;
          })
        }
    }),
    _getMusicListHot().then((res)=>{
      // console.log(res.data);
      let tags = res.data.tags;
      this.hotTags = tags.map((item)=>{
        return item.name;
      })
      this.getPlayList();
      // console.log(this.hotTags)
    })

   },
  mounted() {
    // this.$store.dispatch("getPlaylist",this.cat,this.limit,this.offset);
  },
  computed:{
    // playList(){
    //   this.$store.dispatch("getPlaylist",this.cat,this.limit,this.offset);
    //   // return  this.$store.state.musiclist.playList;
    // },
   // ...mapState({
   //    playList :(state)=>state.musiclist.Playlist
   //  }),
    getOffset(){
     return (this.offset-1) * this.limit;
    }
  },
  methods:{
    /**获取分类歌单 */
    getPlayList() {
      _getPlayList(this.cat, this.limit, this.getOffset).then((res) => {
        this.playList = res.data.playlists;
      });
    },
    handleButtonClick(index,index2){
      // console.log("wewer");
        this.cat = this.list[index][index2].name;
        console.log(this.cat)
        this.$refs.popover.hide();
        this.getPlayList();
    },

    reset(){
      this.offset = 1;
    },
    onPageChange(){
      this.getPlayList();
    }
  }


}
</script>

<style scoped lang="less">
.scroll{
  height:100%;
}
.dance-music-all-musiclist{
  padding:10px 100px 0px 100px
}

.dance-music-ml-popover{
  margin-left: 10px;
  font-size: 12px;
  cursor:pointer;
  //为refernce设置样式
  &-re{
    border:1px solid rgba(177, 179, 184, 0.6);
    width: 80px;
    text-align: center;
    border-radius: 5px;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  &-light,
  &-green {
    background: #fff;
    box-shadow: 0 0 1px var(--border-tint);
  }
  &-dark {
    background: var(--dark-block-bg-color);
    box-shadow: 0 0 1px var(--border);
    cursor: pointer;
  }
  .pop-title{
    width: 100%;
    padding: 5px 5px;
  }

  .pop-scroll{
    height: 300px;
    .pop-all-button{
      width: 100%;
    }
    .el-button{
      font-size: 14px;
    }
  }
  .pop-container{
    padding:5px 10px;
    .pop-item{
      display: flex;
      padding:10px 0px;
      align-items: flex-start;
      &-left {
        flex: 1;
        text-align: center;
        font-size: 18px;
        .iconfont {
          font-size: 18px;
          margin-right: 5px;
        }
      }
      &-right {
        flex: 5;
        display: grid;
        grid-template-columns: repeat(5,1fr);
        .el-button{
          margin: 0;
          padding: 10px;
          border-radius: 0;
        }
      }
    }
    &-dark{
      .el-button{
        background:var(--dark-block-bg-color) ;
        border:none;
        color: rgb(220, 221, 228);
      }
    }

  }

}


</style>