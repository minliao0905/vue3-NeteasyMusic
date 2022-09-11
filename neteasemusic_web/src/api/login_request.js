import axios from 'axios'
import store from '@/store'

const baseURL = "http://10.158.160.230:8080";
//根路径


let ajaxTimer = 0;
// export function request(config){
    //设置加载状态，
    // store.commit('showLoading');
    const install = axios.create({
        baseURL,
        timeout:3000
    });
    //请求拦截器，在发送请求之前，检测完成需要完成的任务
    install.interceptors.request.use((config)=>{
        ajaxTimer ++ ;
        //config是作为配置对象，包含请求头
        return config
    },error => {
        // store.commit('hiddenLoading');
        return error
    });

    install.interceptors.response.use((config)=>{
        ajaxTimer++;
        if(ajaxTimer == 0) {store.commit('hiddenLoading')}
        return config;
    },error=>{
        // store.commit('hiddenLoading');
        throw error;
        // return err;
    })

export default  install;