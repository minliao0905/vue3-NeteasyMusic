<template>
   <div :class='indiviClass'>
       <card-group :card-list='personalized'/>
   </div>
</template>
<script>
import cardGroup from 'content/MusicCard/CardGroup' 
import {mapState} from 'vuex'
export default {
  name :'MV_MusicList',
  components:{cardGroup},
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