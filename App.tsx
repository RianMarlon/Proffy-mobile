import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppStack from './src/routes/AppStack';

import { RootSiblingParent } from 'react-native-root-siblings';

import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_600SemiBold, Archivo_700Bold, Archivo_500Medium, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  else {
    return (
      <RootSiblingParent>
        <AppStack />
        <StatusBar style="light" />
      </RootSiblingParent>
    );
  }
}
