import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import StudyTabs from './StudyTabs';
import GiveClasses from '../pages/GiveClasses';

const { Navigator, Screen } = createStackNavigator();

function PrivateStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
      <Screen name="MyProfile" component={Profile} />
      <Screen name="GiveClasses" component={GiveClasses} />
      <Screen name="Study" component={StudyTabs} />
    </Navigator>
  );
}

export default PrivateStack;