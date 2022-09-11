<template>
      <div :class="[`${'recommend-' +  theme}`,'recommend']">
         <textarea name="" :class="['text-area',`${'text-area-' + theme}`]" v-model="content"></textarea>
          <el-button>评论</el-button>
        <template v-if="isEmpty">
          <p>精彩评论</p>
          <div class="recommend-container">
            <ul>
              <li v-for="(item,index) in recommends" :key="index"
                  :class="getlistClass">
                <div>
                  <el-avatar :src="item.user.avatarUrl" :size="40" ></el-avatar>
                </div>
                <div class="recommend-item">
                        <div class="name">
                          <span>{{item.user.nickname}}: </span> {{item.content}}
                        </div>
                        <div class="time">{{_formatDate(item.time)}}</div>
                 </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <el-empty></el-empty>
        </template>
      </div>
</template>

<script>
import {formatDate} from "@/utils/tool";
import {theme} from "@/mixin/global/theme";

export default {
  name: "Recommends",
  mixins:[theme],
  props:{
    recommends:{
      type:Array,
      default:[]
    },
    id:{
      type: [String,Number],
      default:""
    }
  },
  data(){
    return {
      content:"",
    }
  },
  methods:{
    _formatDate(data){
      return formatDate(new Date(data),"yyyy年MM月dd日 hh:mm:ss")
    }
  },
  computed:{
    isEmpty(){
      return this.recommends&&this.recommends.length;
    },
    getlistClass(){
        return [`${"recommend-container-li-" + this.theme}`, "recommend-container-li"]
    }
  }
}
</script>

<style scoped lang="less">
.recommend {
    padding: 15px 10px 10px 10px;
    position: relative;

    &-light {
      background: #f0f0f2;
    }

    &-dark {
      background: #1c1e22;
    }

    &-green {
      background: #f0f0f2;
    }

    p {
      text-align: left;
    }

  .text-area {
    width: 100%;
    margin: 10px 14px;
    height: 60px;
    border: 1px solid var(--border);
    padding: 5px;
    outline-style: none;
        &-dark {
          background: #2b2c31;
          color: #fff;
          border: none;
        }
  }

  .recommend-container {
    margin-left: 20px;
    &-li {
      display: flex;
      list-style: none;
      .el-avatar {
        margin: 2px;
      }

      .recommend-item {
        padding-left: 10px;
        font-size: 14px;
        mix-height: 70px;
        max-height: 150px;
        span {
          color: var(--el-color-primary);
          font-size: 13px;
        }
        .name{
          padding: 10px 0;
        }
      }
      &-light:nth-child(2n) {
        background: rgba(216, 216, 224, 0.5);
      }

      &-dark:nth-child(2n) {
        background: rgba(38, 41, 49, 0.98);
      }

      &-green:nth-child(2n) {
        background: rgba(166, 166, 173, 0.2);
      }
    }
  }

}

</style>