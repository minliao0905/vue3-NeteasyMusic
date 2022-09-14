<template>
  <div class="search"> 
     <div class="search-suggest-title" v-if="keywords">
        搜索" <span>{{ keywords }}</span> "相关的结果
      </div>
      <div class="search-con" v-loading="loading">
        <div v-if="songsList.length==0" class="search_box">
        <div class="search_none">抱歉，并未搜索到任何结果</div></div>
      <div v-else>
        <song-list :music-list='songsList' ref="search_songList" 
            :length="length"
            ></song-list>
      </div>
      </div> 
  </div>
</template>

<script>
import {_search} from 'api/search'
import songList from 'common/songlist'
import {mapState} from 'vuex'
import {ElMessage  } from 'element-plus' 
export default {
    name:'Search',
    components:{songList},
    props:{
        
    },
    data(){
        return {
            keyword:'',
            songsList:[],
            songNum:0,
            loading:false,
        }
    },
    methods:{
       async getDataList(){  
           this.keywords = this.$route.params.keywords
           if(!this.keywords) return   
           this.loading= true 
           this.songsList = []
              _search(this.keywords).then(res=>{
                console.log(res)
                let dataList = []
                if(res.data.code==200){
                    // 返回songs 有只有30条内容
                  dataList = res.data.result.songs
                  this.sonNum = res.data.result.songCount
                } 
                // 对保存的data数据进行处理 方便songlist 处理 
               dataList.forEach ((item)=>{
                    let obj = {
                        name:item.name,
                        mv:item.mv,
                        id:item.id,
                        artist:item?.ar[0].name,
                        album:item?.ar[0].alia[0],
                        picUrl:item?.al.picUrl
                    }
                    this.songsList.push(obj)
                })
            })  
            // 若访问请求时间超过5s则判断请求失败
            setTimeout(()=>{
                this.loading = false
            if(this.songsList.length == 0){
                 this.showMessage("搜索失败！","error")      
            }else{
                this.showMessage("搜索成功！","success")
            }
            },5000)
            
        },
        showMessage(message,type){
              ElMessage({
         message: message,
         type:type
      })
        }
    },
    created(){
     this.getDataList() 
    },
    mounted() { 
       
    },
    computed:{
        ...mapState({searchList:(state)=>state.search.searchList}), 
    },
    watch:{
        $route(){
            this.getDataList()
        }
    }

}
</script>

<style lang='less' scoped>
.search{
    height:100%;
}
.search-suggest-title{
    margin:10px;
    color:grey;
}
.search_box{
    width:100%;
    height:100%;
    text-align:center; 
}
.search_none{
    height:100%;
    margin:0 auto;
    color:grey;
}

</style>