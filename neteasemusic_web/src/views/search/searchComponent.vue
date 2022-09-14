<template>
   <div class='searchComponet'>
    <div class="search_con">
       <el-input placeholder="搜索歌手/歌名/歌词" v-model="keyword" class="searchinput" clearable @change="onSearch"></el-input>
       <el-button color="red"  class="searchbtn" @click="onSearch"  >搜索</el-button>
    </div> 
   </div> 
</template>   
  
<script setup>
 import {useRouter} from 'vue-router'
import {onMounted, ref}  from 'vue'
// 调用路由
const router = useRouter()
 let keyword = ref("")
 onMounted(()=>{
  keyword.value = ""
 })
 const onSearch = ()=>{
  console.log("跳转")
    router.push("/search/"+ keyword.value)
 }
</script> 
<style lang="less" scoped>
 .search_con { 
   display: flex; 
   margin:5px;
   margin-left:20px;
   width: 100%;
  .searchinput{
    width:200px;
  }
  .searchbtn{
    margin-left:10px;
    font-size:12px;
  }
 }
 
</style> 

 