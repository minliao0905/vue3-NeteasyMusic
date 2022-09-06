// import {_getMusicListDetail,_getSongsDetail,_getRecommends,_getSub,_getMusicUrl,_getLyric} from "@/api/detail";
// import {songDetail} from "@/api/detail";
import {_getMusicListDetail} from "@/api/detail";

const state={
    detailList:{}
};
const mutations = {
    GETDETAILLIST :(state,detaillist)=>{
        state.detailList = detaillist
        // state.playlist = detaillist.playlist;
        // state.privilages=detaillist.privilages;
    } ,
    // GETSONGLIST:(state,songlist)=>{
    //     state.songList = songlist;
    // }
    // GETPLAYLIST(state, playlist) {
    //     state.playlist = playlist;
    // },
    // GETPRIVILAGES(state,privilages){
    //     state.privilages=privilages;
    // }
};
const actions = {
    async getMusicdetailList({commit},id){
        let result = await _getMusicListDetail(id);
        if(result.data.code==200){
            commit("GETDETAILLIST",result.data);
        }
    },
    // async getMusicdetailsongList({commit},tracks){
    //     let length = tracks.length;
    //     let musiclist = [];
    //     if(length){
    //         for(let i=0,length=tracks.length;i<length;i++){
    //             _getSongsDetail(tracks[i].id).then((res)=>{
    //                 let song = new songDetail(res.data.songs)
    //                 musiclist.push(song);
    //             })
    //         }
    //     }
    //     // console.log(AllMusicList);
    //     commit("GETSONGLIST",musiclist);
    // }
    // async getdetailplayList({commit}){
    //     if(state.detailList){
    //         commit("GETPLAYLIST",state.detailList.playlist);
    //     }
    // },
    // async getdetailprivilages({commit}){
    //     if(state.detailList){
    //         commit("GETPERIVATECONTENT",state.detailList.privilages)
    //     }
    // }
};
const getters = {
    getDetailplaylist(state){
        return state.detailList.playlist;
    },
    // getPrivilages(state){
    //     return state.detailList.privilages;
    // },
    // getSonglists(state){
    //         return state.songList;
    // }
};

export default {
    state,
    mutations,
    actions,
    getters
}