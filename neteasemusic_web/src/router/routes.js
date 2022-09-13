import MusicListDetail from "@/views/musiclist-detail/MusicListDetail";

const Individuation = () =>import('@/views/individuation/individuation');
const AllMusicList = () => import('@/views/AllMusicList/all-music-list');
const Mv = () =>import('@/views/MV/mv') 
const NewSongs = ()=>import('@/views/new-songs/new-songs')
const MvDetail = () => import("@/views/MV/mv-detail")
const Search =()=>import("@/views/search/search")
const routes = [
    
    {
        path:'/',
        redirect:'/individuation'
    },
    {
        path:'/individuation',
        component:Individuation
    },
    {
        path: '/musiclistdetail/:id/:time',
        component: MusicListDetail
    },
    {
        path:'/AllMusicList',
        component:AllMusicList
    },
    {
        path:'/mv',
        component:Mv
    },
    {
        path:'/new-songs',
        component:NewSongs
    },
    {
        path: '/mv-detail/:id',
        component: MvDetail
    },
    {
        name:'search',
        path:'/search/:keywords',
        component:Search,
        
    }


];
export default routes