export const MusicChangeinfoRequestDTO=(userId,data,time)=>{
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