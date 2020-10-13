import React, { useContext } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

import AuthContext from '../contexts/AuthContext';

import PrivateStack from './PrivateStack';
import PublicStack from './PublicStack';

function Stacks() {  
  const { isValidToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
      }}>
        <ActivityIndicator 
          size={Platform.OS == "android" ? 80 : "large"} 
          color="#8257E5" 
        />
      </View>
    );
  }

  return isValidToken ? <PrivateStack /> : <PublicStack />;
}

export default Stacks;