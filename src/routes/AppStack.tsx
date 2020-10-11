import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from '../contexts/AuthContext';
import Stacks from './Stacks';

function AppStack() {  
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stacks />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default AppStack;