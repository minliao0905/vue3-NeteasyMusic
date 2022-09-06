import {createStore} from "vuex";
import musiclist from "./musiclist"
import discover from "./discover"
import detail from "./detail"
export default createStore({
      state:{
          theme:'light',
          user:null,
          uid:null,
          cookie:null,
          isloading:false,
      },
    mutations:{
          setTheme(state,theme){
              state.theme = theme;
              localStorage.setItem('theme',theme);
          },
          showLoading(state){
              state.isloading=true;
          },
          hiddenLoading(state){
              state.isloading = false;
          }
    },
    getters:{
        getTheme(state){
            if (localStorage.getItem('theme')) {
                state.theme = localStorage.getItem('theme');
            }
            return state.theme;
        }
    },
    modules:{
         musiclist,
        discover,
        detail,
    }
})