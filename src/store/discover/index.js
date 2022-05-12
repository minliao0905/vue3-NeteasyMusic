import {getnewSongs, getPersonalized, getPrivateContent} from "@/api/discover";

export default{
    state:{
        personalized :[],
        privacont:[],
        newsongs:[],
    },
    mutations:{
        GETPERSONALIZED(state,personalized){
            state.personalized = personalized;
        },
        GETPERIVATECONTENT(state,privacont){
            state.privacont = privacont;
        },
        GETNEWSONGS(state,newsongs){
            state.newsongs = newsongs;
        }
    },
    actions:{
        async  getPersonalized({commit}){
            let result = await getPersonalized();
            // console.log(result.data.result);
            if(result.data.code==200){
               commit('GETPERSONALIZED',result.data.result);
            }
        },
        async getPrivacont({commit}){
            let result = await getPrivateContent();
            console.log(result.data.result);
            if(result.data.code==200){
                commit('GETPERIVATECONTENT',result.data.result);
            }
        },
        async getnewSongs({commit}){
            let result = await getnewSongs();
            console.log(result.data.result);
            if(result.data.code==200){
                commit('GETNEWSONGS',result.data.result);
            }
        }
    },
    getters:{},
}