import request from  './request'


export  const getPersonalized = (config)=>request({url:'/personalized',params:{ limit:config}});

export const getPrivateContent= (config)=>request({url:'/personalized/privatecontent'});

export const getnewSongs = (config)=>request({url:'/personalized/newsong'});