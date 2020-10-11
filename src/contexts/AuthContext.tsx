import React, { createContext, useEffect, useState } from 'react';
import { hasTokenValid } from '../services/auth';

interface AuthContextData {
  isValidToken: boolean,
  checkToken(): Promise<void>,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const response = await hasTokenValid();
  
    setIsValidToken(response);
  }

  return (
    <AuthContext.Provider 
      value={{isValidToken, checkToken}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
