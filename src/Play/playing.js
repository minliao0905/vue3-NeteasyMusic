export const playing = {
    data() {
        return {
            playIndex: .5,
            playName: null,
            playId:null
        }
    },
    mounted() {
        /**音乐播放时发射playing事件
         * @param1 对应歌单正在播放音乐的歌曲下标
         * @param2 正在播放歌曲的音乐名字
         */
        this.$bus.on('Playing', (index, name,id) => {
            this.playIndex = index;
            this.playName = name;
            this.playId=id;
        })
    },
}

export class Song{
    constructor(index,song,url='',id) {
        this.index=index;
        this.name=song.name;
        this.artist=song.artist;
        this.src=url;
        this.pic=song.pic||song.picUrl;
        this.id=id;
    }
}

// 用于格式化歌词
export class lyricItem{
    constructor(time,lyric){
        this.time=time;
        this.lyric=lyric;
    }
}