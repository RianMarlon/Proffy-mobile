import { useNavigation } from '@react-navigation/native';
import React  from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import successBackground from '../../assets/images/success-background.png';
import successCheckIcon from '../../assets/images/icons/success-check-icon.png';

import styles from './styles';

interface SuccessProps {
  title: string,
  description: string,
  textButton: string,
  routeButton: string,
}

const Success: React.FC<SuccessProps> = ({
    title, description, textButton, routeButton 
  }) => {

  const { navigate } = useNavigation();

  function handleNavigateBack() {
    navigate(routeButton);
  }
  
  return (
    <View style={styles.successContainer}>
      <ImageBackground
        resizeMode="cover"
        source={successBackground}
        style={styles.successBackgroundImage}
      >
        <Image source={successCheckIcon} style={styles.successCheckIcon} />
        <View style={styles.content}>
          <Text style={styles.title}>{ title }</Text>
          <Text style={styles.description}>
            { description }
          </Text>
        </View>
      </ImageBackground>

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>{ textButton }</Text>
      </RectButton>
    </View>
  );
}

export default Success;