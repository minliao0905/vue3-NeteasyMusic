import {createStore} from "vuex";
import musiclist from "./musiclist"
import discover from "./discover"
import detail from "./detail"
import search from './search'
export default createStore({
      state:{
          theme:'light',
          username:null,
          avatar:"",
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
          },
          addUser(state,username){
            state.username = username
            localStorage.setItem('username',username);
          },
          setAvatar(state,avatar){
            state.avatar = avatar
            localStorage.setItem('avatar',avatar)
          }
    },
    getters:{
        getTheme(state){
            if (localStorage.getItem('theme')) {
                state.theme = localStorage.getItem('theme');
            }
            return state.theme;
        },
        getUsername(state){
            if (localStorage.getItem('username')) {
                state.username = localStorage.getItem('username');
            }
            return state.username; 
        }
        ,
        getUserAvatar(state){
            if(localStorage.getItem('avatar')){
                state.avatar = localStorage.getItem('avatar');
            }
            return state.avatar;
        }
    },
    modules:{
         musiclist,
        discover,
        detail,
        search
    }
})