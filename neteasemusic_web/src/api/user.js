import request from './login_request'

export function _loginbyphone(username,password){
    return request({
        url:'/user/login',
        data:{
            username:username,
            password:password
        },
        // 设置请求头，设置传参格式为json 为避免乱码设置 charset=utf-8
        Headers:{"Content-Type":"application/json;charset=UTF-8"}, 
        method:'post'
    })
} 
export function _register(username,password){
    return  request({
        url:'/user/register',
        data:{
           username:username,
            password:password
        }, 
        // 设置请求头，设置传参格式为json 为避免乱码设置 charset=utf-8
        Headers:{"Content-Type":"application/json;charset=UTF-8"}, 
        method:'post'
    })
}

export function _loginbyqrcode(){
    return request ({
        url:'login/qr/key',

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