<template>
  <div>32434323</div>
</template>

<script>
import {_search} from 'api/search'
import {mapState} from 'vuex'
export default {
    name:'Search',
    mounted() {
        this.$store.dispatch('getSearchList')
    },
    computed:{
        ...mapState({searchList:(state)=>state.search.searchList})
    }

}
</script>

<style>

</style>