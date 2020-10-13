import React, { createContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { hasTokenValid } from '../services/auth';

interface AuthContextData {
  isValidToken: boolean,
  checkToken(): Promise<void>,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const response = await hasTokenValid();
    
    setLoading(false);
    setIsValidToken(response);
  }

  if (loading) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
      }}>
        <ActivityIndicator size={80} color="#8257E5" />
      </View>
    );
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
