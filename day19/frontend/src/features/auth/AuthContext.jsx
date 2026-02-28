import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext()

const AuthContext = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)


  return (
    <authContext.Provider value={{user,loading,setLoading,setUser}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthContext