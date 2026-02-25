import React, { useContext } from 'react'
import { authContext } from '../AuthContext'

export function useAuth(){
    const context = useContext(authContext)

    return context
}