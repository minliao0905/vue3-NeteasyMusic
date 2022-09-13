import request from './request'
export function _search(keywords){
    return request({
        url:'/search',
        params:{
            keywords:keywords
        }
    })
}