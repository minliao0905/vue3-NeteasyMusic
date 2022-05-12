<template>
  <div class="scroll">
  <el-scrollbar
                ref="scroll"
                class=".scrollbar-demo-item"
                :theme="getTheme"
                :speed="speed"
                :disable-bar="disableBar"
                :disable-wheel="disableWheel"
                :track-color="trackColor"
                :thumb-color="thumbColor"
                :height="height"
                @moveStart="moveStart"
                @moveEnd="moveEnd"
                @pullingUp="pullingUp">
    <slot></slot>
  </el-scrollbar>
  </div>
</template>
<script>
import {theme} from "@/mixin/global/theme.js"
export default {
  name: "Scroll",
  mixins: [theme],
  props: {
    speed: {
      type: Number,
      default: 30,
    },
    disableBar: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "",
    },
    disableWheel: {
      type: Boolean,
      default: false,
    },
    trackColor: {
      type: String,
      default: "",
    },
    thumbColor: {
      type: String,
      default: "",
    },
  },
  methods: {
    update() {
      // console.log("!231");
      this.$refs.scroll.update();
    },
    setScrollTop(x) {
      // console.log("1231");
      this.$refs.scroll.setScrollTop(x);
    },
    /**上拉加载更多 */
    pullingUp() {
      this.$emit("pullingUp");
    },
    /**鼠标按下进度条小球 */
    moveStart() {
      this.$emit("moveStart");
    },
    /**鼠标释放进度条小球 */
    moveEnd() {
      this.$emit("moveEnd");
    },
  },
}
</script>

<style scoped>

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
}
.scroll{
   height: 45vh;
}
</style>
