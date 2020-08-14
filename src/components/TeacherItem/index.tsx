import React, { useContext } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem:React.FC<TeacherItemProps> = ({ teacher }) => {
  const { teachers, setTeachers } = useContext(TeachersContext);

  function handleLinkToWhatsapp() {
    api.post('/connections', {
      id_user: teacher.id
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorites() {
    const teachersArray = teachers.map((teacherItem: Teacher) => {
      if (teacherItem.id === teacher.id) {
        teacher.favorited = !teacherItem.favorited;
        teacherItem.favorited = teacher.favorited;
      }

      return teacherItem;
    });

    const teachersFavorited = teachersArray.filter((teacherItem: Teacher) => {
      return teacherItem.favorited;
    });

    setTeachers(teachersArray);
    await AsyncStorage.setItem('favorites', JSON.stringify(teachersFavorited));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          source={{ uri: teacher.avatar }}
          style={styles.avatar}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.biography}>{teacher.biography}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '} 
          <Text style={styles.priceValue}>R${teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorites}  
            style={[
                styles.favoriteButton, 
                teacher.favorited ? styles.favoritedButton : {}
            ]}
          >
            { teacher.favorited 
              ? <Image source={unfavoriteIcon} /> 
              : <Image source={heartOutlineIcon} /> 
            }
          </RectButton>

          <RectButton 
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;
