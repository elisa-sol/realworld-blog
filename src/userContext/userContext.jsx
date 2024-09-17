import React, { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.isLoggedIn) {
      setUser({
        ...savedUser,
        image: savedUser.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
      });
    }
  }, []);

  const loginUser = (userData) => {
    const userToSave = {
      ...userData,
      isLoggedIn: true,
      image: userData.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    };
    localStorage.setItem('user', JSON.stringify(userToSave));
    setUser(userToSave);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
}
