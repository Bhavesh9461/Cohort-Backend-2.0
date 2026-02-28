import React, { useContext } from 'react'
import { authContext } from '../AuthContext'
import { login, register } from '../services/auth.api'

export function useAuth(){
    const context = useContext(authContext)

    const {user, setUser, loading, setLoading} = context

     const handleLogin = async (username, password)=>{
        setLoading(true)
        try{
            const res = await login(username,password)
            setUser(res.user)

            return res

        } catch (err){
            console.error(err);
        } finally{
            setLoading(false)
        }
    }

    const handleRegister = async (email, username, password)=>{
        setLoading(true)
        try{
            const res = await register(email, username, password)
            setUser(res.user)

            return res
        }
        catch(err){
            console.error(err);
        }
        finally{
            setLoading(false)
        }
    }

    return {
        user,loading,handleLogin,handleRegister
    }
}