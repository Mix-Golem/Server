export const MusicInsertRequestDTO=(userId,data,time)=>{
    return{
            id: userId,
            title: data.title,
            about: data.about,
            prompt: data.prompt,
            media: data.media,
            genre: data.genre,
            thumbnail: data.thumbnail,
            lyrics: data.lyrics,
            createdAt: time
    }
}

export const findLyricsResponseDTO = (lyric)=>{

    return{
        startTime:lyric.start_time,
        endTime:lyric.end_time,
        content:lyric.lyric
    }
}

export const findMusicInfoResponseDTO = (lyrics,favorite,musicData)=>{

    return{
        id:musicData.id,
        userId:musicData.userId,
        userName:musicData.userName,
        title:musicData.title,
        about:musicData.about,
        prompt : musicData.prompt,
        media : musicData.media,
        public : musicData.public,
        thumbnail: musicData.thumbnail,
        lyrics: lyrics,
        like : favorite

    }
}

export const ChangeinfoMusicRequestDTO = (changeData)=>{
    return{
        id: changeData.id,
        title: changeData.title,
        public: changeData.public
    }
}