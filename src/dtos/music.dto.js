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