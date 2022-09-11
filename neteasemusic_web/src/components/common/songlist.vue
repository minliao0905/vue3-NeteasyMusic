<template>
    <div  class="song-list" v-if="musicList.length">
      <el-table :data="musicList" style="width:100%; cursur:pointer"
          @row-dblclick="handleDbclick"
          :row-class-name="tableRowClassName" 
      >
        <el-table-column type="index" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="name"  label="音乐标题" width="180"/>
        <el-table-column>
          <template #header>
            <span>操作</span>
          </template>
          <template #default = "props">
             <i class="iconfont icon-xihuan" v-if="!newsongs"/>
             <div class="dance-music-table-tr-td-two" v-if="newsongs">
               <img v-lazy="props.row.pic" style="width: 20px"/>
               <div class="card-play">
                 <i class="idonfont icon-icon_play"></i>
               </div>
             </div>
          </template>
        </el-table-column>
        <el-table-column prop="artist" label="歌手"/>
        <el-table-column prop="album" label="专辑"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
      </el-table>
    </div>
</template>

<script>
import {playing} from "@/Play/playing";
import {playMusic} from "@/mixin/global/play-music";
import {randomStr} from "@/utils/random";

export default {
  name: "songlist",
  mixins:[playing,playMusic],
  props:{
    musicList: {
      type:Array,
      default:[]
    },
    /**如果是播放器内使用双击时只设置index，不提供musicList节省性能 */
    player: {
      type: Boolean,
      default: false,
    },
    newsongs:{
      type:Boolean,
      default:false
    },
    length:{
      type:Number,
      default:null,
    }
  },
  data(){
    return {
      refreshTag:0,
      id:randomStr(),
    }
  },
  methods: {
    indexMethod(index) {
      if (index < 10) {
        index = index + 1;
        return "0" + index;
      }
      return index;
    },
    handleDbclick(row) {
       // console.log(row.index + "   sdsd"  + row.name)
      if (this.player) {
        this.$bus.emit("PlayMusicListItem", row.index);
        return;
      }
      // console.log("song-list:" + this.id);
      this.playMusic(row.index);

    },
    tableRowClassName({row, rowIndex}) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    }

  }
}
</script>

<style scoped>

</style>