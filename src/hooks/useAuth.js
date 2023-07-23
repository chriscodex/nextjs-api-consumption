import { useState, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api';
import { useRouter } from 'next/router';

const AuthContext = createContext();

function useProvideAuth() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [errorLogin, setErrorLogin] = useState(null);

  const signIn = async (email, password) => {
    const axiosOptions = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, axiosOptions);

    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, { expires: 5 });
      // Axios header authorization
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    router.push('/login');
  };

  return {
    user,
    signIn,
    logout,
    errorLogin,
    setErrorLogin,
  };
}

function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { ProviderAuth, AuthContext };
