import { _search } from "@/api/search";
export default   {
    state:{
        keywords:''
    },
    mutations: {
        GETSEARCHLIST(keywords){
            state.keywords=keywords
        }
    },
    actions:{
        async getSearchList({commit},keywords){
            let result=await _search(keywords)
            if(result.data.code==200){
                commit("GETSEARCHLIST",result.data);
                console.log(result.data)
            }
        }
    }
} 