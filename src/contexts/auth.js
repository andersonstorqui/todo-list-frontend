import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const parsedUserToken = JSON.parse(userToken);
      
      const userStorage = JSON.parse(localStorage.getItem("users_db")) || [];
      const foundUser = userStorage.find(user => user.email === parsedUserToken.email);
      if (foundUser) setUser(foundUser);
    }
  }, []);

  const signin = (email, password) => {
    const userStorage = JSON.parse(localStorage.getItem("users_db")) || [];

    const foundUser = userStorage.find(user => user.email === email);

    if (foundUser) {
      if (foundUser.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('user_token', JSON.stringify({ email, token }));
        setUser(foundUser);
        return null; 
      } else {
        return 'Email ou senha incorretos';
      }
    } else {
      return 'Usuário não encontrado';
    }
  };

  const signup = ({ email, password }) => {
    const userStorage = JSON.parse(localStorage.getItem('users_db')) || [];

    const existingUser = userStorage.find(user => user.email === email);

    if (existingUser) {
      return "Já tem uma conta com esse e-mail";
    }

    const newUser = [...userStorage, { email, password }];
    localStorage.setItem('users_db', JSON.stringify(newUser));

    return null; 
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('user_token');
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
