import request from '@/api/request'

export function _loginbyphone(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone:phone,
            password:password
        }
    })
}

export function _loginbyemail(email,password){
    return  request({
        url:'/login',
        params:{
            email:email,
            password:password
        }
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