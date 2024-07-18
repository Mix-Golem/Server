
//이건 예시 실제 사용하는거 아님
export const addVideo=async (req) =>{
    try{
        console.log();
        const conn =await pool.getConnection();
        const videoOriginal = await pool.query(insertVideoOriginSql,['original',req.title,req.description,req.link,req.image,req.youtube_created_at,req.created_at,req.readed_at,req.updated_at,req.category_id,req.user_id]);
        const videoRevision = await pool.query(insertVideoRevisionSql,[videoOriginal[0].insertId,'revision',req.title,req.description,req.link,req.image,req.youtube_created_at,req.created_at,req.readed_at,req.updated_at,req.category_id,req.user_id]);
        conn.release();
        return videoOriginal[0].insertId;
    }catch(err){
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};
