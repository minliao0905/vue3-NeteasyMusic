<template>
  <div :class="headClass"> 
    <div :class="program+ 'header-main'">
      <div class="left">
        search组件
      </div>
      <div class="right">
        <el-avatar size='35px' class="avatar"    
        @click="handleAvatarClick"
        />
         <div class="user-name" v-if='user.name==null'>未登录</div>
        <div class="item">
            <el-popover
                placement="bottom-start"
                :width="200"
                trigger="click"
                :effect="getTheme"
            >
              <template #reference>
                <el-button
                    :class="[
                `iconfont icon-icon-huanfu`,
                `${theme  + '-huanfu-icon'}`,
              ]"
                    width="60px"
                    height="30px"
                    type="text"
                    transparent
                />
              </template>
              <div slot="title" class="popover-title">主题</div>
            <div  slot="content" class="pop">
                 <div class="theme-item" @click="handleThemeLight">优雅白</div>
                 <div class="theme-item" @click="handleThemeDark">炫酷黑</div>
                 <div class="theme-item" @click="handleThemeGreen">清新绿</div>
            </div>
            </el-popover>
        </div>
      </div>
    </div>
    
   
  </div>
   <login v-show='isLogin' class="login"></login> 
 
</template>

<script>
import {theme} from "@/mixin/global/theme.js";
import Login from 'content/user/Login';
export default {
  name: "LayoutHeader",
  mixins:[theme],
  components:{Login},
  props:{
    user:{
      type:Object,
      default:()=>{
       return  { 
        name:null,
        password:null}
       }
    }
  },
  data(){
    return {
      isShow:true,
      isLogin:false,
    }
  },
  computed:{
    headClass(){
        return [`${this.program + this.theme  + "-header"}`,"dance-music-header"];
    },
  },
  methods:{
    handleAvatarClick (){
      this.isLogin = true
    },
   hiddenLogin() {
      this.isLogin = false
    },
       
    //设置主题颜色 改变 通过修改 this.$store.commit("setTheme", "light");
    handleThemeLight(){
      this.$store.commit("setTheme",'light');
      console.log(this.theme);
    },
    handleThemeDark(){
      this.$store.commit("setTheme",'dark');

      console.log(this.theme);
    },
    handleThemeGreen(){
      this.$store.commit("setTheme",'green');
      console.log(this.theme);
    },
  //  返回主界面
    handleHomeButton(){
      this.$router.push("/individuation");
    },
  //  路由
    go(index){
      this.$router.go(index);
    }
  }
}
</script>

<style scoped lang="less">
.dance-music-header{
  display:flex;
  align-items:center;
  height:58px;
  width:100%;
  border: 1px solid #312828;
  &-title{
    width:18%;
    height:100%;
    text-align:center;
    display: flex;
    &-left{
      flex:1;
      display:flex;
      align-items:center;
      justify-content: space-around; 
      .item{
        width:18px;
        height: 18px;
        line-height: 18px;
        cursor: pointer;
        overflow: hidden;
        border-radius: 50%;
        i{
          display: inline-block;
        }
      }
      .item:nth-child(1) {
        background: #ed655a;
      }
      .item:nth-child(2) {
        background: #e0c04c;
      }
      .item:nth-child(3) {
        background: #72be47;
      }
    }
    &-right{
      flex:1;
      display: flex;
      align-items:center;
      justify-content: space-around; 
      .item{
        flex:1;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  &-main{
    width: 100%;
    height: 100%;
    display: flex;
    .left{
      flex: 2;
      text-align: center;
      line-height: 58px;
    }
    .right{
      flex: 7;
      display: flex;
      justify-content: flex-end;
      align-items: center;
       .user-name{
        margin:0 5px ;
        font-size:12px
      }
      .item{
        width: 60px;
        text-align: center;
        float: left;

      }
      .iconfont {
        font-size: 24px;
      }
      .popover-title {
        font-size: 16px;
        text-align: left;
      }
    }
  }
}

//设置气泡的样式 因为显示器气泡内的内容，元素不在right 内，被包含在body中，所以原来的样式无效
.el-popover{
  display: flex;
  height: 60px;
  width: 100%;
  cursor: pointer;
  .pop {
    display: flex;
    height: 60px;
    width: 100%;
    cursor: pointer;
  }
  .theme-item {
    flex: 1px;
    line-height: 60px;
    text-align: center;
    font-size: 13px;
  }
  .theme-item:nth-child(1) {
    background: var(--light-bg-color);
    color: var(--dark-bg-color);
    border: 1px solid #eae5e5;
  }
  .theme-item:nth-child(2) {
    background: #292c32;
    color: #fff;
  }
  .theme-item:nth-child(3) {
    background: #449e60;
  }
}

.iconfont {
  font-size:12px;
}
.header-side-enter-active{
  animation: slideInDown 0.4s;
}
.header-side-leave-active{
  animation:slideInDown 0.4s reverse;
}
//  主题
.dance-music-light-header {
  background: var(--light-bg-color);
}
.dance-music-dark-header {
  background: var(--dark-header-bg-color);
}
.dance-music-green-header {
  background: var(--green-bg-color);
}
</style>