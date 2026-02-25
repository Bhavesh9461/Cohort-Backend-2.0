import React, { createContext, useEffect, useState } from 'react'
import {login, register, getMe} from "./services/auth.api"

export const authContext = createContext()

const AuthContext = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

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

  return (
    <authContext.Provider value={{user,loading,handleLogin,handleRegister}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthContext