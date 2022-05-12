import request from './request'
//获取歌单分类
// export function  getCatList(){  return request({url:'/playlist/catlist'}) }
//
// //获取热门歌单
// export const getMusicLisHot = ()=>  request({url:'/playlist/hot'})
//
//
// //获取不同tag的精品歌单
// export const getHighquality=(cat,limit) =>request({ url:'/top/playlist/highquality',
//     params:{
//         cat:cat,
//         limit:limit,
//         time:new Date().getTime()
//     }})
//
// //获取全部歌单
// export const getPlayList = (cat,limit,offset) => request({url:'/top/playlist',params:{cat:cat,limit:limit,offset}})