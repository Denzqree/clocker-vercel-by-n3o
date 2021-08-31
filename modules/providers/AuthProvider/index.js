import axios from 'axios';
import * as React from 'react';
import { useEffect, useState, useContext } from 'react';

import firebaseClient, { persistenceMode } from './../../../config/firebase/client/';

const AuthContext = React.createContext([{}, () => {}]);

export const login = async ({ email, password}) => {
    firebaseClient.auth().setPersistence(persistenceMode);

    try {
      await firebaseClient
        .auth()
        .signInWithEmailAndPassword(email, password);
        return firebaseClient.auth().currentUser
    } catch (err) {
      console.log('ERROR ' + err);
    }
}

export const logout = () => {
    firebaseClient.auth().signOut();
    console.log('signed out...')
}

export const signup = async ({email, password, username}) => {
    try {
          await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
          const user = await login({email, password})
          const token = await user.getIdToken();
          //setupProfile(token, username)
          const { data } = await axios({
            method: 'post',
            url: '/api/profile',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            data: {username}
            })
            console.log(data)
      } catch (err) {
        console.log(err);
      }
}

export const useAuth = () => {
  const [auth] = useContext(AuthContext);
  return [auth, { login, logout, signup}];
}

const onAuth = (auth, setAuth) => {
  const unsubscribe = firebaseClient.auth().onAuthStateChanged((user) => {
          if(user){
            console.log("firebase detected user logged")
            console.log(auth)
            setAuth({
              loading:false,
              user:user
            })
          }else{
          console.log("firebase detected user logged out")
          setAuth({
            loading:false,
            user:false
          })
          console.log(auth) 
        }
        return () => unsubscribe()
  })
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loading:true,
        user:false
    })

    useEffect(() => {

        const onAuthChange = onAuth(auth, setAuth)

        return () => onAuthChange
      }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )

};
