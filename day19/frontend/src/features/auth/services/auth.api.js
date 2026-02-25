import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register(username, email, password) {
    try{
        const res = await api.post("/api/auth/register",{
            username: username,
            email: email,
            password: password
        })

        return res.data
    } catch(err){
        throw err
    }
}

export async function login(username,password) {
    try{
        const res = await api.post("/api/auth/login",{
            username: username,
            password: password
        })

        return res.data
    } catch(err){
        throw err
    }
}

export async function getMe() {
    try{
        const res = await api.get("/api/auth/get-me")

        return res.data
    } catch(err){
        throw err
    }
}