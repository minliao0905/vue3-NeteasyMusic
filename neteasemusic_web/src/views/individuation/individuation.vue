<template>
    <div :class="indiviClass">
      <div class="dance-music-group">

<!--        <swiper :banner="banner" class="swiper"/>-->
        <h4 :class="[`${program + 'indivi-h4'}`,`${program + 'indivi-h4-'+ theme}`]">推荐歌单</h4>
        <card-group :card-list="personalized" />
        <PrivateContent :privatecont="privacont"/>
        <NewSongs :music-list="songList" :num=10 />
      </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import cardGroup from "@/components/content/MusicCard/CardGroup";
import PrivateContent from "@/views/individuation/childsComps/PrivateContent";
import NewSongs from "@/views/individuation/childsComps/newSongs";


export default {
  name: "individuation",
  components: {NewSongs,  PrivateContent, cardGroup},
  computed:{
    indiviClass(){
      return [`${this.program + "indivi"}`, `${this.program + "-indivi-" + this.theme}`];
    },
    ...mapState({
        personalized:(state)=> state.discover.personalized,
        privacont:(state)=>state.discover.privacont,
        songList:(state)=>state.discover.newsongs,
    })
  },
  mounted() {
    this.$store.dispatch("getPersonalized"),
    this.$store.dispatch("getPrivacont"),
     this.$store.dispatch("getnewSongs")
  },

  data(){
    return {

    }
  }
}
</script>

<style scoped lang="less">
.dance-music-indivi{
  width:100%;
  height:100%;
  //border: 1px solid #bb4444;
  overflow-y: scroll;
  .swiper{
    width:calc(100%-20px);
    margin-left:10px;
  }
  &-h4-dark{
    color:var(--dark-text-color);
  }
}
</style>