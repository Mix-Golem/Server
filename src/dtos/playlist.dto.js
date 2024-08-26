export const PlaylistInsertRequestDTO=(userId,data,time)=>{
    return{
        id: userId,
        title: data.title,
        createAt: time
     }
}