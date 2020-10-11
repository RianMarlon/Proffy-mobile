import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import StudyTabs from './StudyTabs';
import GiveClasses from '../pages/GiveClasses';
import AuthContext from '../contexts/AuthContext';

const { Navigator, Screen } = createStackNavigator();

function PrivateStack() {
  const { isValidToken } = useContext(AuthContext);
  
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName={isValidToken ? "Landing" : "Login"}>
      <Screen name="Landing" component={Landing} />
      <Screen name="MyProfile" component={Profile} />
      <Screen name="GiveClasses" component={GiveClasses} />
      <Screen name="Study" component={StudyTabs} />
    </Navigator>
  );
}

export default PrivateStack;