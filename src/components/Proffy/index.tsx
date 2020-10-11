import React  from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';

import proffyLogoBigger from '../../assets/images/logo-bigger.png';
import introBackground from '../../assets/images/intro-background.png';

import styles from './styles';

const Proffy: React.FC = () => {
  return (
    <View style={styles.proffyContainer}>
      <ImageBackground resizeMode="contain"
        source={introBackground} 
        style={styles.proffyBackgroundImage}
      >
        <View style={styles.content}>
          <Image source={proffyLogoBigger} style={styles.logo} />
          <View style={styles.sloganContainer}>
            <Text style={styles.textSlogan}>Sua plataforma de estudos online.</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Proffy;
