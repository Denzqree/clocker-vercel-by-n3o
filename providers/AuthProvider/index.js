import * as React from 'react';
import { useEffect, useState, useContext } from 'react';

import firebaseClient, { persistenceMode } from './../../config/firebase/client/';

const AuthContext = React.createContext([{}, () => {}]);

export const login = async ({ email, password}) => {
    firebaseClient.auth().setPersistence(persistenceMode);

    try {
      await firebaseClient
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('ERROR ' + err);
    }
}

export const logout = () => {
    firebaseClient.auth().signOut();
}

export const signup = async ({email, password, usename}) => {
    
    try {
        const user = await firebaseClient
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          login({email, password})
          // setupProfile(token, username)
          const { data } = await axios({
            method: 'post',
            url: '/api/profile',
            header: {
              'Authentication': `Bearer ${user.getToken()}`
            },
            data: {
              username: values.username
            }
          })

        // console.log(data);
        console.log(user);
      } catch (err) {
        console.log(err);
      } finally {
        goToHome();
      }
}

export const useAuth = () => {
  const [auth] = useContext(AuthContext);
  return [auth, { login, logout, signup}];
}

const onAuth = async (setAuth) => {
  await firebaseClient.auth().onAuthStateChanged((user) => {
          if(user){
            setAuth({
              loading:false,
              user:user
            })
          }
  })
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loading:true,
        user:false
    })

    useEffect(() => {

        const onAuthChange = onAuth(setAuth)

        return () => onAuthChange
      }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )

};
