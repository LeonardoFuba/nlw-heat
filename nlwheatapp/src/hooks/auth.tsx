import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';


type User = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  async function signIn() {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?scope=${'read:user'}&client_id=603f37d52145090c66d8`;
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (authSessionResponse.type === 'success'
      && authSessionResponse.params.error !== 'access_denied') {
        const response = await api.post<AuthResponse>('authenticate', {
          code: authSessionResponse.params.code,
        });
        const { token, user } = response.data;

        await AsyncStorage.setItem('@dowhile:token', JSON.stringify(token));
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }

  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const token = await AsyncStorage.getItem('@dowhile:token')

      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${JSON.parse(token)}`;
        api.get<User>('profile').then(response => {
          setUser(response.data);
        })
      }
      setIsSigningIn(false);
    }
    loadUserStorageData();
  }, []);

  // useEffect(()=>{
  //   const url = window.location.href;
  //   const hasGithubCode = url.includes('?code=');

  //   if(hasGithubCode) {
  //     const [urlWithoutCode, githubCode] = url.split('?code=');
  //     window.history.pushState({}, '', urlWithoutCode);

  //     signIn(githubCode);
  //   }

  // }, []);

  return (
    <AuthContext.Provider value={{ signIn, user, signOut, isSigningIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
