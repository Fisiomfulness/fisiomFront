import { UserContext } from '@/context/User';
import { useContext } from 'react';

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export { useUser };
