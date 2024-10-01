


export const sunoResponseDTO=async (req,s3url)=>{

    return {
        "title":req.title,
        "image":req.image_url,
        "lyric":req.lyric,
        "audio":s3url,
        "prompt":req.gpt_description_prompt,
        "tags":req.tags
    }
}