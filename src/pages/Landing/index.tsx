import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import HeaderProfile from '../../components/HeaderProfile';

function Landing() {

  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);
  const [me, setMe] = useState({
    first_name: '',
    avatar: '',
    email: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      api.get('/connections')
        .then(response => {
          const { total } = response.data;
          setTotalConnections(total);
        });
  
      api.get('/me')
        .then(response => {
          const { user } = response.data;
          setMe({ ...user });
        });
    }, [])
  );

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderProfile 
            name={me.first_name}
            image={{
              uri: me.avatar 
                || 'https://www.gravatar.com/avatar/f9879d71855b5ff21e4963273a886bfc?d=retro&r=g'
            }}
          />
        </View>

        <View>
          <Image source={landingImg} style={styles.banner} />

          <Text style={styles.title}>
            Seja bem-vindo, {'\n'}
            <Text style={styles.titleBold}>O que deseja fazer?</Text>
          </Text>

          <View style={styles.buttonsContainer}>
            <RectButton 
              onPress={handleNavigateToStudyPages}
              style={[styles.button, styles.buttonPrimary]}>
              <Image source={studyIcon} />

              <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>

            <RectButton 
              onPress={handleNavigateToGiveClassesPage} 
              style={[styles.button, styles.buttonSecondary]}
            >
              <Image source={giveClassesIcon} />
              <Text style={styles.buttonText}>Dar aulas</Text>
            </RectButton>
          </View>
          <Text style={styles.totalConnections}>
            Total de {totalConnections} conexões já realizadas {' '}
            <Image source={heartIcon} />
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Landing;
