import MusicListDetail from "@/views/musiclist-detail/MusicListDetail";

const Individuation = () =>import('@/views/individuation/individuation');
const AllMusicList = () => import('@/views/AllMusicList/all-music-list')
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
    }


];
export default routes