'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/services/auth';
import { httpLogout } from '@/services/users';
import Loading from '@/app/loading';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verifyToken()
      .then((user) => {
        setUser(user);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await httpLogout(); // ? Clears the httpOnly cookie
    router.push('/login');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {loading ? <Loading /> : children}
    </UserContext.Provider>
  );
};
