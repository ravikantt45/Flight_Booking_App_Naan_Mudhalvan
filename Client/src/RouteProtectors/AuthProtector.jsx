import { useEffect } from 'react';

const AuthProtector =  ({ children }) => {

  useEffect(() => {

    if (!localStorage.getItem('userType')) {
      window.location.href = '/';
    }
  }, [localStorage]);


  return children;
};

export default AuthProtector;