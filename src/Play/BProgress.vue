<template>
  <div
    :class="progressClass"
    @mouseenter="handleProgressMouseEnter"
    @mouseleave="handleProgressMouseLeave"
  >
    <!-- 进度条背景 -->
    <div
      :class="outClass"
      ref="progress"
      :style="outBgStyle"
      @click="handleClick"
    >
      <!-- 进度条内部进度 -->
      <div :class="innerClass" :style="innerBgStyle" ref="inner">
        <!-- 滑块 -->
        <transition name="vbestui-progress-opacity">
          <div
            v-if="showThumb"
            v-show="isShowThumbComputed"
            :class="loadbarClass"
            :style="loadbarStyle"
            @mousedown="handleMouseDown"
            @touchstart="handleTouStart"
            ref="loadbar"
          >
            <!-- 滑块内部小球 -->
            <div
              :class="loadbarItemClass"
              v-if="showThumbItem"
              :style="loadbarItemStyle"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BProgress",
  props: {
    /**进度百分比 */
    percent: {
      type: Number,
      default: 0,
    },
    allowClick: {
      type: Boolean,
      default: false,
    },
    allowDrag: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    /**是否禁用渐变动画 */
    disableTransition: {
      type: Boolean,
      default: false,
    },
    /**是否显示动画 */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**进度条宽度 */
    strokeWidth: {
      type: Number,
      default: NaN,
    },
    trackBaseColor: {
      //progree 背景颜色
      type: String,
      default: "",
    },
    trackColor: {
      //进度条颜色
      type: [String, Array],
      default: "",
    },
    /**进度条滑块背景色 */
    thumbColor: {
      type: String,
      default: "",
    },
    /**小球圆心背景色 */
    thumbItemColor: {
      type: String,
      default: "",
    },
    //是否显示进度条小球
    showThumb: {
      type: Boolean,
      default: false,
    },
    /**显示进度条小球，并且只有在鼠标hover时才显示 */
    hoverShowThumb: {
      type: Boolean,
      default: false,
    },
    //是否显示进度条小球圆心
    showThumbItem: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isShow() {
      return this.percent * 1 != 0;
    },
    isShowPercent() {},
    /**根元素样式 */
    progressClass() {
      return [this.vertical ? "vbestui-progress-vertical" : "vbestui-progress"];
    },
    outClass() {
      return [
        this.vertical
          ? "vbestui-progress-outstyle-vertical"
          : "vbestui-progress-outstyle",
      ];
    },
    innerClass() {
      return [
        this.vertical
          ? "vbestui-progress-innerstyle-vertical"
          : "vbestui-progress-innerstyle",
        this.isActive
          ? this.vertical
            ? "vbestui-progress-vertical-active"
            : "vbestui-progress-active"
          : "",
      ];
    },
    /**进度条小球class */
    loadbarClass() {
      return [
        this.vertical
          ? "vbestui-progress-loadbar-vertical"
          : "vbestui-progress-loadbar",
      ];
    },
    /**进度条小球圆心样式 */
    loadbarItemClass() {
      return ["vbestui-progress-loadbar-circle"];
    },
    /**进度条背景样式 */
    outBgStyle() {
      const style = {
        backgroundColor: `${this.trackBaseColor}`,
        height: this.vertical ? "" : `${this.strokeWidth}px`,
        width: this.vertical ? `${this.strokeWidth}px` : "",
        borderRadius: this.strokeWidth ? `${this.strokeWidth}px` : "", //设置滚动条高度时修改border-radius
      };
      return style;
    },
    /**进度条样式 */
    innerBgStyle() {
      const style = {
        width: this.vertical ? `` : `${this.percent}%`,
        height: this.vertical ? `${this.percent}%` : "",
        background: this.vertical
          ? typeof this.trackColor == "string"
            ? `${this.trackColor}`
            : `linear-gradient(to top,${this.trackColor[0]} 0%,${this.trackColor[1]} 100%)`
          : typeof this.trackColor == "string"
          ? `${this.trackColor}`
          : `linear-gradient(to right,${this.trackColor[0]} 0%,${this.trackColor[1]} 100%)`,
        borderRadius: this.strokeWidth ? `${this.strokeWidth}px` : "",
        transition: this.disableTransition ? "none" : "all .4s",
      };
      return style;
    },
    /**进度条小球样式 */
    loadbarStyle() {
      const style = {
        width: this.strokeWidth ? `${this.thumbSize}px` : "",
        height: this.strokeWidth ? `${this.thumbSize}px` : "",
        backgroundColor: `${this.thumbColor}`,
      };
      return style;
    },
    /**进度条小球圆心样式 */
    loadbarItemStyle() {
      const style = {
        /**设置进度条小球圆心背景， */
        background: this.thumbItemColor
          ? `${this.thumbItemColor}`
          : typeof this.trackColor == "string"
          ? `${this.trackColor}`
          : `${this.trackColor[0]}`,
      };
      return style;
    },
    /**进度条滑块尺寸 */
    thumbSize() {
      /**根据strokeWidth 的值动态设置 滑块thumb的宽高
       * 大于8 thumb=strokeWidth*3
       * 小于3 thumb=strokeWidth*5
       */
      let thumbSize =
        this.strokeWidth > 8 ? this.strokeWidth * 3 : this.strokeWidth * 4;
      thumbSize = this.strokeWidth <= 3 ? this.strokeWidth * 5 : thumbSize;
      thumbSize = thumbSize < 12 ? 12 : thumbSize;
      return thumbSize;
    },
    //判断滑块是否显示
    isShowThumbComputed() {
      if(!this.isShow)return false;//滑块超出范围隐藏

      /**如果hover显示滑块，拖拽时一直显示，不拖拽时根据是否进入显示，不hover显示滑块时根据isShow判断是否显示 */
      return this.hoverShowThumb?(this.isDrag?true:this.getIsHover):this.isShow;
    },
    /**动态获取_hoverShowThumb数据 */
    getIsHover() {
      return this.isHover;
    },
  },
  data() {
    return {
      isDrag: false, //是否处于拖拽状态
      isHover: false, //hoverShowThumb模式下判断thumb是否显示
    };
  },
  methods: {
    /**鼠标进入滚动条 */
    handleProgressMouseEnter() {
      if (!this.hoverShowThumb) return;
      this.isHover = true;
    },
    handleProgressMouseLeave() {
      if (!this.hoverShowThumb) return;
      this.isHover = false;
    },
    handleClick(e) {
      /**不允许点击、拖拽时不执行函数 */
      if (!this.allowClick) return false;
      if (this.isDrag) return;
      /**鼠标窗口坐标 */
      const { clientX, clientY } = e;
      /**进度条窗口坐标 */
      let { x, bottom } = this.$refs.progress.getBoundingClientRect();

      let _percent;
      if (!this.vertical) {
        /**保存进度条长度 */
        let width = this.$refs.progress.offsetWidth;
        let _width = clientX - x;
        /**计算点击百分比 */
        _percent = (_width / width) * 100;
      } else {
        let verticalWidth = this.$refs.progress.offsetHeight;
        let _verticalWidth = bottom - clientY;
        _percent = (_verticalWidth / verticalWidth) * 100;
      }
      this.$emit("update:percent", _percent);
      this.$emit("click", _percent);
    },
    handleMouseDown(e) {
      /**是否允许拖拽 */
      if (!this.allowDrag) return false;

      /**拖拽状态 */
      this.isDrag = true;

      /**禁用浏览器复制 */
      document.body.style.userSelect = "none";
      /**取消transition */
      this.$refs.inner.style.transition = "none";

      this.$emit("update:percent", this.percent);
      this.$emit("dragbegin", this.percent);

      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(e) {
      let { x, bottom } = this.$refs.progress.getBoundingClientRect();
      let _percent;
      /**计算移动距离
       * 水平滚动条
       */
      if (!this.vertical) {
        let moveX = e.clientX - x;
        /**计算进度百分比 */
        _percent = (moveX / this.$refs.progress.offsetWidth) * 100;
      } else {
        /**垂直滚动条，bottom是滚动条底部窗口坐标 */
        let moveY = bottom - e.clientY;
        _percent = (moveY / this.$refs.progress.offsetHeight) * 100;
      }

      /**范围校验 */
      _percent = _percent < 0 ? 0 : _percent;
      _percent = _percent > 100 ? 100 : _percent;

      this.$emit("update:percent", _percent);
      this.$emit("dragging", _percent);
    },
    handleMouseUp(e) {
      this.isDrag = false;

      document.body.style.userSelect = "initial";
      this.$refs.inner.style.transition = "all .4s";

      this.$emit("update:percent", this.percent);
      this.$emit("dragend", this.percent);

      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
    },

    handleTouStart(e) {
      /**是否允许拖拽 */
      if (!this.allowDrag) return false;

      /**拖拽状态 */
      this.isDrag = true;

      /**禁用浏览器复制 */
      document.body.style.userSelect = "none";
      /**取消transition */
      this.$refs.inner.style.transition = "none";

      this.$emit("update:percent", this.percent);
      this.$emit("dragbegin", this.percent);

      document.addEventListener("touchmove", this.handleTouchMove);
      document.addEventListener("touchend", this.handleTouchEnd);
    },
    handleTouchMove(e) {
      let { x, bottom } = this.$refs.progress.getBoundingClientRect();
      let _percent;
      /**计算移动距离
       * 水平滚动条
       */
      if (!this.vertical) {
        let moveX = e.clientX - x;
        /**计算进度百分比 */
        _percent = (moveX / this.$refs.progress.offsetWidth) * 100;
      } else {
        /**垂直滚动条，bottom是滚动条底部窗口坐标 */
        let moveY = bottom - e.clientY;
        _percent = (moveY / this.$refs.progress.offsetHeight) * 100;
      }

      /**范围校验 */
      _percent = _percent < 0 ? 0 : _percent;
      _percent = _percent > 100 ? 100 : _percent;

      this.$emit("update:percent", _percent);
      this.$emit("dragging", _percent);
    },
    handleTouchEnd(e) {
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchend", this.handleTouchEnd);

      this.isDrag = false;

      document.body.style.userSelect = "initial";
      this.$refs.inner.style.transition = "all .5s";

      this.$emit("update:percent", this.percent);
      this.$emit("dragend", this.percent);
    },
  },
};
</script>


