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

export const findMusicInfoResponseDTO = (lyrics,favorite,artistData,musicData)=>{
    console.log(musicData);
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
        like : favorite,
        artist : artistData.name,
    }
}

export const ChangeinfoMusicRequestDTO = (changeData)=>{
    return{
        id: changeData.id,
        title: changeData.title,
        public: changeData.public
    }
}

export const findMusicHistoryResponseDTO = (historyData) =>{
    return{
        id:historyData.id,
        userId:historyData.userId,
        userName:historyData.userName,
        title:historyData.title,
        thumbnail:historyData.thumbnail
    }
}

export const insertFavoriteRequestDTO = (userId,date,data)=>{
    return {
        userId : userId,
        createdAt : date,
        songId : data.songId
    }
}

export const FavoriteRequestDTO = (userId,data)=>{
    return {
        userId : userId,
        songId :  Number(data.songId)

    }
}

export const randomResponseDTO = (music,artist)=>{
    return{
        songId : music.id,
        userId : music.user_id,
        title : music.title,
        artist : artist,
        thumbnail : music.thumbnail
    }

}