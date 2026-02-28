import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function getFeed() {
    try{
        const res = await api.get("api/posts/feed")

        return res.data
    }
    catch(err){
        throw err
    }
}

export async function createPost(imageFile, caption) {

    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append("caption", caption)

    const res = await api.post("/api/posts", formData)

    return res.data
}

export async function likePost(postId) {
    const res = await api.post("/api/posts/likes/" + postId)

    return res.data
}

export async function unlikePost(postId) {
    const res = await api.post("/api/posts/unlikes/" + postId)

    return res.data
}