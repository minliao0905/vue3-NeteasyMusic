<template>
  <div class="login">
    <div class="back"> 
      <div class="x" @click="hiddenRegister">
        <i class="vbestui-iconfont icon-close">x</i>
      </div>
      <div class="son">
        <i class="iconfont icon-Phone phone"></i>
      </div>
    </div>
    <div class="main">
      <div>
        <div class="from-item">
          <el-input
            type="text"
            name="phone"
            id="phone"
            placeholder="请输入账号名"
            required
            clearable
            v-model="phone" 
          />
          <p>{{phoneMessage}}</p>
        </div>
        <div class="from-item">
          <el-input
            type="password"
            name="password" 
            placeholder="密码长度需为6-10位"
            show-password
            v-model="password"
          />
          <p>{{pwdMessage}}</p>
        </div>
          <div class="from-item">
          <el-input
            type="checkpassword"
            name="checkpassword" 
            placeholder="请再次输入注册密码"
            show-password
            v-model="checkpassword"
          />
          <p>{{pwdMessage}}</p>
        </div>
        <div class="from-item">
          <el-button background="var(--main-color)" color="#fff" class="log" @click="register">注册</el-button>
        </div>
        <div class="from-item">
          <div class="backTologin" @click="backToLogin">返回登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import {_register} from  '@/api/user'
import { ElMessage } from 'element-plus'; 
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      phoneMessage: "",
      password: "",
      checkpassword:"",
      pwdMessage: "",
    };
  },
  methods: {
    /**登陆 */
    register() {
       if(this.do_submit()){ 
        _register(this.phone, this.password).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          this.phoneMessage = "该账号已被注册使用";
        } else if(res.data.code==200){ 
          // 注册成功 
          this.showMessage()
          this.$parent.hiddenRegister()
          // 返回登录
        }
      });
       }
    },
    // 密码验证格式
    do_submit(){
      if(this.password==''||this.checkpassword == ''){
          this.pwdMessage = '密码不能为空'
          return false
      }
       if(this.password!=this.checkpassword){
            this.pwdMessage = '两次密码须填写不一致哟'
            return false
       }
       let regex = /^(?=.*[a-z])(?=.*\d)[^]{6,10}$/;
       if(!regex.test(this.password)){
          this.pwdMessage = '密码必须包含数字和密码'
          return false
       }
       return true
    },
     hiddenRegister(){
      this.$parent.hiddenRegister()
    },
   showMessage(){
      ElMessage({
         message:'注册成功！',
         type:'success'
      })
    },
    backToLogin(){
      console.log("qwe")
      this.$parent.hiddenRegister()
      this.$parent.showLogin()
    }

  },
};
</script>
<style scoped>
.login {
  width: 400px;
  height: 460px;
  position:absolute;
  z-index: 999;
     left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); 
  background: #fafafa;
}
.back {
  width: 100%;
  height: 30%;
  position: relative;
}
.x {
  width: 26px;
  height: 26px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
.x .icon-close{
  font-size:24px;
}
.back .son {
  width: 58px;
  height: 102px;
  position: absolute;
  left: 0;
  right: 20px;
  top: 80px;
  bottom: 0;
  margin: auto;
}

.from-item {
  width: 60%;
  margin: 0px auto;
  padding: 10px 0px 10px 10px;
}
.from-item p {
  color: red;
}
input {
  width: 200px;
  height: 2em;
}
p {
  font-size: 13px;
}
.log {
  outline-style: none;
  background: red;
  color: #fff;
  border: 0;
  height: 40px;
  width: 200px;
  border-radius: 10px;
}
.register {
  color: #333;
  text-align: center;
  margin-right: 35px;
}
.phone {
  color: var(--main-color);
  font-size: 64px;
}
</style>