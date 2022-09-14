import request from './request'

export function _phoneVerify(phone){
  return request({
      url:'/cellphone/existence/check',
      params:{
          phone:phone
      }
  })
}

export function _Login(phone,password){
  return request({
      url:'/login/cellphone',
      params:{
          phone:phone,
          password:password
      }
  })
}
export function _Logout(){
  return request({
    url:'/logout'
  })
}

/**调用用户注册接口 */
export function _Register(ruleForm){
   return request({
    url:'/register/cellphone',
    params: ruleForm
   })
}
/** 检查该用户的手机号是否被注册 */
export function _checkPhone(phone){
  return request({
    url:'/cellphone/existence/check',
     params:{
      phone:phone
     }
  })
}

/**获取用户详情 */
export function _getUserDetail(uid){
  return request({
    url:'/user/detail',
    params:{
      uid:uid
    }
  })
}


/** 获取验证码 */
export function _getCaptcha(phone){
  return request({
    url:'/captcha/sent',
     params:{
      phone:phone
     }
  })
}
/** 获取验证码 */
export function _checkCaptcha(phone,captcha){
  return request({
    url:'/captcha/verify',
     params:{
      phone:phone,
      captcha:captcha,
     }
  })
}

/**重复昵称检测 */
export function _checkNickName(name){
  return request({
    url:'/nickname/check',
    params:{
      nickname:name
    }
  })
}

/**获取用户歌单 */
export function _getSongList(id){
  return request({
      url:'/user/playlist',
      params:{
          uid:id
      }
  })
}

export class PlayList{
  constructor(playlist){
      this.name=playlist.name;//为了方便menu使用
      this.id=playlist.id;
      this.cover=playlist.coverImgUrl;
  }
}