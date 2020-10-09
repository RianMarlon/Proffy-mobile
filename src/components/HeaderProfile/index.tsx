import React from 'react';

import { View, Image, Text, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { removeToken } from '../../services/auth';
import offIcon from '../../assets/images/icons/off-icon.png';

import styles from './styles';

export interface HeaderProfileProps {
  image: ImageSourcePropType,
  name: string
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({ image, name }) => {

  const { navigate } = useNavigation();

  function onPressOff() {
    removeToken();
    navigate('Login');
  }

  function navigateMyProfile() {
    navigate('MyProfile');
  }

  return (
    <View style={styles.container}>
      <RectButton 
        onPress={navigateMyProfile}
        style={styles.buttonAvatarName}
      >
        <Image
          source={image}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          { name }
        </Text>
      </RectButton>
      <RectButton 
        onPress={onPressOff}
        style={styles.buttonOff}
      >
        <Image
          source={offIcon}
          style={styles.imageButtonOff}
        />
      </RectButton>
    </View>
  );
}

export default HeaderProfile;
