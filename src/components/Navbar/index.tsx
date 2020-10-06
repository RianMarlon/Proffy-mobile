import React from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';

interface NavbarProps {
  namePage: string
}

const Navbar: React.FC<NavbarProps> = ({ namePage }) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing');
  }

  return(
    <View style={styles.topBar}>
      <BorderlessButton style={styles.buttonBack} onPress={handleGoBack}>
        <Image source={backIcon} resizeMode="contain" />
      </BorderlessButton>

      <Text style={styles.namePage}>{namePage}</Text>

      <Image source={logoImg} resizeMode="contain" />
    </View>
  );
}

export default Navbar;
