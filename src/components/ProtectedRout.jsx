import {useState, useContext} from 'react'
import {DataContext} from '../contexts/dataContext'
import Cookies from 'universal-cookie';


export const ProtectedRout = ({children}) => {
    const cookie = new Cookies();
    const user = cookie.get('user')
    
    if (!user || user ==''){
        return window.location.href='./'
    }

    return children
}