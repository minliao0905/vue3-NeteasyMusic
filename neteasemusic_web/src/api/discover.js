import request from  './request'


export  const getPersonalized = (config)=>request({url:'/personalized',params:{ limit:config}});

export const getPrivateContent= (config)=>request({url:'/personalized/privatecontent'});

export const getnewSongs = (config)=>request({url:'/personalized/newsong'});



/**最新歌曲 */
export function _getTopSongs(type) {
  return request({
      url: '/top/song',
      params: {
          type: type
      }
  })
}