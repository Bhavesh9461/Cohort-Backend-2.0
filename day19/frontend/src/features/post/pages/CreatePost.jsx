import React, { useRef, useState } from 'react'
import "../style/createPost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const navigate = useNavigate()

    const [caption, setCaption] = useState("")

    const postImageInputFieldRef = useRef(null)

    const {loading,handleCreatePost} = usePost()

    async function handleSubmit(e){
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]

        await handleCreatePost(file, caption)

        navigate("/")

        setCaption("")
    }

    if(loading){
        return(
            <main>
                <h1>Creating Post...</h1>
            </main>
        )
    }

  return (
    <main className='create-post-page'>
        <div className="from-container">
            <h1>Create Post</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <label htmlFor="postImage">Select Image</label>
                <input ref={postImageInputFieldRef} hidden type="file" name='postImage' id='postImage' />
                <input
                value={caption}
                onInput={(e)=>{setCaption(e.target.value)}}
                type="text" name='caption' id='caption' placeholder='Enter caption' />
                <button className='button primary-button'>Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost