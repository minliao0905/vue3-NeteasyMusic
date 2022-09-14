<template>
  <div :class="headClass"> 
    <div :class="program+ 'header-main'">
      <!-- search模块 -->
       <search-component :keywords="keywords"></search-component>
      <div class="right">
        
        <div class='user-box' :class="`${theme + '-userbox'}`" @click="handleAvatarClick"> 
            <el-avatar size='default' class="avatar"  :src='useravatar||""' :key="useravatar" /> 
           <div class="user-name" >{{username==null?'未登录':username}}</div>
           <div class="user-name" @click.stop="showlogout" v-if="username!=null">退出登录</div>
        </div>
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
   <register v-show='isRegister' class='register'></register>
    <el-dialog
    v-model="centerDialogVisible"
    title="Warning"
    width="30%"
    align-center
  >
    <span>确定要退出登录吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button> 
        <el-button type="primary" @click="logout"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {theme} from "@/mixin/global/theme.js";
import Login from 'content/user/Login'; 
import Register from 'content/user/Regiter'; 
import SearchComponent from '@/views/search/searchComponent.vue';
import {_Logout} from 'api/login' 
import {ElMessage} from 'element-plus'
export default {
  name: "LayoutHeader",
  mixins:[theme],
  components:{Login,Register ,SearchComponent},
   
  data(){
    return {
      isShow:true,
      isLogin:false,
      isRegister:false,
      keywords:'',
      centerDialogVisible:false,
    }
  },
  computed:{
    headClass(){
        return [`${this.program + this.theme  + "-header"}`,"dance-music-header"];
    }  
  },
  methods:{
    handleAvatarClick (){
      this.isLogin = true
    },
   hiddenLogin() {
      this.isLogin = false
    },
   showLogin(){
    this.isLogin = true
   } , 
   hiddenRegister(){
    this.isRegister = false
   }  ,
   showRegister(){
    this.isRegister = true
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
    },
    search(){
      console.log(this.keywords)
      this.$router.push("/search/" + this.keywords)
    },
    showlogout(){
      if(this.username!="")
      this.centerDialogVisible = true;
      else{
          ElMessage({
          message:'您当前并未登录！',
          type:'info'
         }) 
         return 
      }
    },
    logout(){
      _Logout().then((res) =>{
        console.log(res)
        if(res.data.code == 200){
           ElMessage({
          message:'退出成功',
          type:'success'
         }) 
           this.$store.commit("addUser", "");   
            this.$store.commit("setAvatar", "");   
          localStorage.setItem('avatar',"");
          localStorage.setItem('uid',"")
          
         this.centerDialogVisible = false
        }else{
           ElMessage({
          message:'退出失败',
          type:'error'
         })
        } 
      })
    }
  }
}
</script>

<style scoped lang="less">
// .fake-input {
//   width: 0;
//   height: 0;
//   font-size: 0;
//   border: none;
//   outline: none;
//   padding: 0;
// }
.dance-music-header{
  display:flex;
  align-items:center;
  height:58px;
  width:100%;
  border-bottom: 1px solid #d4c9c9;
  &-title{ 
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
.user-box{ 
  display:flex;
  align-items: center;
  font-size:14px; 
    .user-name{
        margin:0 5px ; 
      }
}
.dark-userbox{
  color:#fff
}
.light-userbox .green-userbox{
  color:black
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