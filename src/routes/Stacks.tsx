import React, { useContext } from 'react';
import { ImageBackground } from 'react-native';

import splashScreen from '../../assets/splash.png';

import AuthContext from '../contexts/AuthContext';

import PrivateStack from './PrivateStack';
import PublicStack from './PublicStack';

function Stacks() {  
  const { isValidToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <ImageBackground 
        source={splashScreen}
        style={{ flex: 1, backgroundColor: '#8257E5' }}
        resizeMode="cover"
      />
    );
  }

  return isValidToken ? <PrivateStack /> : <PublicStack />;
}

export default Stacks;