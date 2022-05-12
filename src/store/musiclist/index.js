import {_getPlayList} from "@/api/music-list";


const state = {
    Catlist:{},
    Musicishotlist:{},
    Highquality:{},
    Playlist:[],
    PlayingList:[]
};
const mutations = {
    GETCATLIST(state,catlist){
        state.Catlist = catlist;
    },
    GETPLAYLIST(state,playlist){
        state.Playlist = playlist;
    },
    GETPLAYINGLIST(state,playinglist){
        state.PlayingList = playinglist;
    }
};
const actions = {
    async getPlaylist({commit},cat,limit,offset){
        let result = await _getPlayList(cat,limit,offset);
        if(result.data.code == 200){
            commit('GETPLAYLIST',result.data.playlists );
            console.log(result.data.playlists)
        }
    },
    getPlayingList(){
        console.log(state.PlayingList)
        return  state.PlayingList;
    }
}
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}