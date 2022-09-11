<template>
  <div class="mv-rank" v-if="topMv.length !== 0">
    <el-row>
      <el-col v-for="index in topMv.length" :key="index" :span='12'>
        <div class="rank-item"  > 
          <div class="warp" > 
            <div class="number">{{ index }}</div>
            <div class="mv"><rank-item :item="topMv[index-1]" /></div> 
          </div>
        </div>
      </el-col> 
    </el-row>
  </div>
</template>
<script>
import RankItem from "./rank-item";
export default {
  name: "MVRankList",
  props: {
    topMv: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    RankItem,
  },
  methods: {
    refresh(index) {
      if (index == this.topMv.length) {
        this.$emit("refresh");
      }
    },
  },
};
</script>
<style scoped>
.mv-rank {
  width: 100%;
}
.rank-item {
  width: 100%;
  margin-top: 10px;
}
.warp {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 
.number {
  width: 30px;
  text-align: center;
}
.mv {
  flex: 1;
}
</style>