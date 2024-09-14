import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

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
    const userToSave = { ...userData, isLoggedIn: true };
    localStorage.setItem('user', JSON.stringify(userToSave));
    setUser(userToSave);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
}
