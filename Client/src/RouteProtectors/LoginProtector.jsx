import React from 'react'
import { Navigate } from 'react-router-dom';

const LoginProtector = ({children}) => {

    if (localStorage.getItem('userType')){
        if (localStorage.getItem('userType') === 'customer'){
            return <Navigate to='/' replace /> 
        }else if (localStorage.getItem('userType') === 'admin'){
            return <Navigate to='/admin' replace /> 
        }
    }
  
    return children;
}

export default LoginProtector;