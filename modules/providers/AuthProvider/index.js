import axios from "axios";
import * as React from "react";
import { useEffect, useState, useContext } from "react";

import firebaseClient, {
  persistenceMode, getToken,
} from "./../../../config/firebase/client/";

const AuthContext = React.createContext([{}, () => {}]);

export const login = async ({ email, password }) => {
  firebaseClient.auth().setPersistence(persistenceMode);

  try {
    await firebaseClient.auth().signInWithEmailAndPassword(email, password);
    return firebaseClient.auth().currentUser;
  } catch (error) {
    return {error};
  }
};

export const logout = () => {
  firebaseClient.auth().signOut();
};

export const getUsername = async () => {
    const token = await getToken()
    const result = await axios({
      method:"get",
      url: "/api/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return result.data
  }

export const usernameExists = async (username) => {
  try{
  const usernameExists = await axios({
    method: "get",
    url: "/api/profile",
    params: {
      username,
    },
  })
  return usernameExists
} catch(error){
  return {error:{code:error}}
}
};

export const signup = async ({ email, password, username }) => {
  try {
    await firebaseClient.auth().createUserWithEmailAndPassword(email, password);
    const user = await login({ email, password });
    const token = await user.getIdToken();
    
    return await axios({
      method: "post",
      url: "/api/profile",
      params: {
        username,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return {error}
  }
};

export const useAuth = () => {
  const [auth] = useContext(AuthContext);
  return [auth, { login, logout, signup, usernameExists, getUsername }];
};

const onAuth = (auth, setAuth) => {
  const unsubscribe = firebaseClient.auth().onAuthStateChanged((user) => {
    if (user) {
      setAuth({
        loading: false,
        user: user,
      });
    } else {
      setAuth({
        loading: false,
        user: false,
      });
    }
    return () => unsubscribe();
  });
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: false,
  });

  useEffect(() => {
    const onAuthChange = onAuth(auth, setAuth);

    return () => onAuthChange;
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
