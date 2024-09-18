


export const sunoResponseDTO=async (req)=>{

    return {
        "title":req.title,
        "image":req.image_url,
        "lyric":req.lyric,
        "audio":req.audio_url,
        "prompt":req.gpt_description_prompt,
        "tags":req.tags
    }
}