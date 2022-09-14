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
      <el-form 
       ref="ruleForm"
       :rules="rulesForm"
      :model="ruleForm"  
    class="ruleForm" 
    status-icon>
        <el-form-item class="el-form-item"> 
           <el-input
            type="text"
            name="nickname"
            id="nickname"
            placeholder="请输入昵称"
            required
            clearable
            v-model="ruleForm.nickname" 
            class="form-item" 
             @focus="clearMessage"
          /> 
        </el-form-item>
        <p class="form-p" v-show="MessageCode == 1">{{MessageContent}}</p> 
        <el-form-item> 
           <el-input
            type="text"
            name="phone"
            id="phone"
            placeholder="请输入手机号码"
            required
            clearable
            v-model="ruleForm.phone" 
             class="form-item"
             @focus="clearMessage"
          />
        
        </el-form-item>  <p class="form-p" v-show="MessageCode == 2">{{MessageContent}}</p> 
        <el-form-item> 
           <el-input
            type="password"
            name="password" 
            placeholder="密码长度需为6-10位"
            show-password
            v-model="ruleForm.password"
             class="form-item"
              @focus="clearMessage"
          />
         
        </el-form-item> <p class="form-p" v-show="MessageCode == 3">{{MessageContent}}</p> 
        <el-form-item> 
           <el-input
            type="password"
            name="checkpassword" 
            placeholder="请再次输入注册密码"
            show-password
            v-model="checkpassword"
             class="form-item"
              @focus="clearMessage"
          />
          
        </el-form-item>  <p class="form-p" v-show="MessageCode == 3">{{MessageContent}}</p> 
         <el-form-item class="form-item"
           @focus="clearMessage"> 
          <div>
             <el-input
            type="text"
            name="captcha" 
            placeholder="请输入验证码" 
            v-model="ruleForm.captcha"
            style="width:200px;   margin-right: 10px;" 
          />
           <el-button  @click="getCode" :disabled="hasCode==1" background="var(--main-color)" class="codesend">
             <span v-if="hasCode!=1">发送</span>
             <span  v-if="hasCode==1" >已发送{{timecount}}秒</span>
            </el-button>   
          </div>  
        </el-form-item>  
       <p class="form-p" v-show="MessageCode == 4">{{MessageContent}}</p> 
        <el-form-item>
         <div class="form-item">
          <el-button background="var(--main-color)" color="#fff" class="log" @click="register">注册</el-button>
        </div>
        <div class="form-item">
          <div class="backTologin" @click="backToLogin">返回登录</div>
        </div>
        </el-form-item>
      </el-form>  
    </div>
  </div>
</template>
<script>  
import {_checkNickName, _getCaptcha ,_checkCaptcha,_Register} from '@/api/login';
import {showError,showMessage} from "utils/latest"
 
export default {
  name: "Register",
  data() {
    return {
      ruleForm:{
      nickname:'',
      phone: "", 
      password: "", 
      captcha:"" , // 验证码
      },
      MessageCode :-1, 
      MessageContent:'',
         captchaMessage:"发送",
         hasCode:0,    // 是否获取验证码
         timecount:0,
         timer:null,
     rulesForm:{
        nickname:[{required: true, message: "请将昵称填写完整",  trigger: 'change'}],
         phone:[{required:true, message: "请将电话号码填写完整",  trigger: 'change' }], 
         password:[{required:true, message: "请将密码填写完整",  trigger: 'change' }],
         captcha:[{required:true, message: "请填写验证码",  trigger: 'change'}], 
     }
    };
  },
  methods: {
    /**登陆 */
    register() {
      if (this.do_submit()) {
        let phone = this.ruleForm.phone;
        let captcha = this.ruleForm.captcha; 
        if(phone!=""&&captcha!=""){  
            // 验证验证码
            _checkCaptcha(phone,captcha).then((res1) =>{
              // console.log(res1)
                if(res1.data.code == 200){
                  // 注册
                  _Register(this.ruleForm).then((res2) => {
                    // console.log(res2)
                      if(res2.data.code ==200){
                          showMessage("注册成功",'success')
                        this.hiddenRegister()
                      }else{
                          showMessage("注册失败",'error') 
                      }
                    })
                } 
            },(err)=>{
              console.log(err) 
              this.MessageCode = 4
                this.MessageContent = "验证码错误" 
            })  
        }
      }
    },
    /** 获取验证码, 在获取验证码之前，必须对昵称进行重复性认证 ，不然会返回505报错*/ 
    getCode(){
      if(this.do_submit()){  
        console.log("sjwejwer")
       _checkNickName(this.ruleForm.nickname).then((res)=>{
         console.log(res)
         if(res.data.code!=200){
          this.MessageCode = 1
            this.MessageContent ="您的昵称重复，请重新输入"
            this.ruleForm.nickname = ""
            return ;
         } 
       })
       _getCaptcha(this.ruleForm.phone).then((res)=>{
        console.log(res)
        this.hasCode = 1
      },(error)=>{
        showError()
      }) ;  
      // 定时器
      const times = 60; // 倒计时时间
		 if (!this.timer) {
		 	this.timecount = times; 
			this.timer = setInterval(() => {
				if (this.timecount > 0 && this.timecount <= times) {
					this.timecount--;
				} else {
					this.hasCode = 0;
					clearInterval(this.timer);
					this.timer = null;
				}
			}, 1000)} 
     }
    },
    // 密码验证格式
    do_submit() { 
       var reg = /^1[3-9]\d{9}$/
       if(!reg.test(this.ruleForm.phone)||this.ruleForm.phone == ""){
        this.MessageCode = 2
        this.MessageContent = '请正确填写您的手机号码';
        return false;
       }
      if (this.ruleForm.password == "" || this.checkpassword == "") {
        this.MessageCode = 3
        this.MessageContent = "密码不能为空";
        return false;
      }
      if (this.ruleForm.password != this.checkpassword) {
        this.MessageCode = 3
        this.MessageContent = "两次密码须填写不一致哟";
        return false;
      }
      let regex = /^(?=.*[a-z])(?=.*\d)[^]{6,16}$/;
      if (!regex.test(this.ruleForm.password)) {
        this.MessageCode = 3
        this.MessageContent = "密码必须包含数字和密码或者长度必须在6到16位";
        return false;
      } 
      return true;
    },
    hiddenRegister() {
      this.$parent.hiddenRegister();
    },
     
    backToLogin() { 
      this.$parent.hiddenRegister();
      this.$parent.showLogin();
    },
    // 清除提示消息
    clearMessage(){
      this.MessageCode = -1
      this.MessageContent = "" 
    }
  },
};
</script>
<style scoped>
.login {
  width: 400px;
  height: 80%;
  position: absolute;
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
.x .icon-close {
  font-size: 24px;
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

.form-item {
  width: 500px;
  margin: 0px 10%;
  padding: 10px 0px 10px 10px;
}
 
.form-p {
  color: red;
  margin:0;
  
}
input {
  width: 200px;
  height: 2em;
}
p {
  font-size: 13px;
}
.log, .codesend {
  outline-style: none;
  background: red;
  color: #fff;
  border: 0;
  height: 30px; 
  border-radius: 10px;
} 
.log{
  margin-top:10px;
  height:40px;
  width:200px;
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
.el-form-item{
  margin-bottom: 0;
}
</style>