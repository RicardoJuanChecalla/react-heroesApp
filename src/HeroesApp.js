import { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';
import { AppRouter } from './routers/AppRouter';

const init = () =>{
  // return {
  //   logged : true,
  //   name: 'Ricardo Temporal'
  // }
  return JSON.parse(localStorage.getItem('user')) || {logged: false};
}

export const HeroesApp = () => {
  const [stateUser, dispatch] = useReducer(authReducer, {}, init);
  useEffect(() => {
    if(!stateUser) return;
    localStorage.setItem('user',JSON.stringify(stateUser));
  }, [stateUser]);
  
  return (
    <AuthContext.Provider value={{
      stateUser,
      dispatch
    }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};
