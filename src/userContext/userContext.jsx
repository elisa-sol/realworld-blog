// import React, { createContext, useState, useEffect } from 'react';
//
// export const UserContext = createContext();
//
// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//
//   useEffect(() => {
//     const savedUser = localStorage.getItem('signUpData');
//     if (savedUser && savedUser.isLoggedIn) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);
//
//   const loginUser = (userData) => {
//     const userToSave = { ...userData, isLoggedIn: true };
//     localStorage.setItem('user', JSON.stringify(userToSave));
//     setUser(userToSave);
//   };
//
//   const logoutUser = () => {
//     const savedUser = JSON.parse(localStorage.getItem('user'));
//     if (savedUser) {
//       localStorage.setItem('user', JSON.stringify({ ...savedUser, isLoggedIn: false }));
//     }
//     setUser(null);
//   };
//
//   return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
// }

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.isLoggedIn) {
      setUser(savedUser);
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
