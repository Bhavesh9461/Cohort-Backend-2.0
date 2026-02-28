import { useContext, useEffect } from "react"
import { postContext } from "../PostContext"
import { createPost, getFeed, likePost, unlikePost } from "../services/post.api"


export const usePost = ()=>{
    const context = useContext(postContext)   

    const {loading,setLoading,post,setPost,feed,setFeed} = context

    const handleGetFeed = async ()=>{
        setLoading(true)
        try{
            const data = await getFeed()
            setFeed(data.posts.reverse())
        }
        catch(err){
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    const handleCreatePost = async (imageFile, caption)=>{
        setLoading(true)
        try{
            const data = await createPost(imageFile, caption)
            setFeed([data.post, ...feed])
        }
        catch(err){
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    const handleLike = async (postId) => {
        setLoading(true)
        try{
            const data = await likePost(postId)
            await handleGetFeed()
        }
        catch(err){
            throw err
        }
        finally{
            setLoading(false)
        }
    }
    
    const handleUnlike = async (postId) => {
        setLoading(true)
        try{
            const data = await unlikePost(postId)
            await handleGetFeed()
        }
        catch(err){
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      handleGetFeed()
    }, [])
    

    return {
        loading,feed,handleGetFeed,post,handleCreatePost,handleLike,handleUnlike
    }
}