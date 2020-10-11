import React, { useContext } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';
import TeachersContext, { Teacher, Schedule } from '../../contexts/TeachersContext';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem:React.FC<TeacherItemProps> = ({ teacher }) => {
  const { 
    teachers, favorites, getFavorites,
    setFavorites, setTeachers,
    setQuantityFavorites,
  } = useContext(TeachersContext);
  
  const cost = parseFloat(teacher.cost).toFixed(2);

  function handleLinkToWhatsapp() {
    const data = { id_class: teacher.id_class };
    api.post('/connections', data);
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorites() {
    const data = {
      id_class: teacher.id_class
    }

    const page = 1;
    const perPage = 5;
    
    const response = await api.post('/favorites', data);
    
    const favoritesNoEqualTeacher = favorites.filter((teacherItem: Teacher) => {
      return teacherItem.id_class != teacher.id_class;
    });
    
    const { it_was_inserted } = response.data;

    if (it_was_inserted) {
      getFavorites({ per_page: perPage, page });

      const teachersArray = teachers.map((teacherItem: Teacher) => {
        if (teacherItem.id_class === teacher.id_class) {
          return { ...teacher, is_favorite: true };
        }
  
        return teacherItem;
      });

      setTeachers(teachersArray);
    }

    else {
      if (favorites.length == 1) {
        setFavorites([]);
        setQuantityFavorites(0);
      }

      else {
        setFavorites(favoritesNoEqualTeacher);
        setQuantityFavorites(favoritesNoEqualTeacher.length);
      }

      const teachersArray = teachers.map((teacherItem: Teacher) => {
        if (teacherItem.id_class === teacher.id_class) {
          return { ...teacher, is_favorite: false };
        }
  
        return teacherItem;
      });

      setTeachers([...teachersArray]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          source={{
            uri: teacher.avatar 
              || 'https://www.gravatar.com/avatar/f9879d71855b5ff21e4963273a886bfc?d=retro&r=g'
          }}
          style={styles.avatar}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.first_name} {teacher.last_name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.biography}>{teacher.biography}</Text>

      <View style={styles.schedules}>
        <View style={styles.schedulesTitlesGroup}>
          <Text style={styles.schedulesTitleText}>Dia</Text>
          <Text style={styles.schedulesTitleText}>Horário</Text>
        </View>

        { teacher.schedules.map((schedule: Schedule, index: number) => {
          return (
            <View key={index} style={styles.schedulePill}>
              <Text style={[styles.scheduleText, { width: 62 }]}>
                {schedule.week_day}
              </Text>
              <View style={styles.arrow}>
                <View style={styles.arrowBase}></View>
                <View style={styles.arrowTip}>
                  <View style={styles.arrowTipTop} />
                  <View style={styles.arrowTipBottom} />
                </View>
              </View>

              <Text style={styles.scheduleText}>
                {schedule.from.split(':')[0]}h - {schedule.to.split(':')[0]}h
              </Text>
            </View>
          )
        }) }
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '} 
          <Text style={styles.priceValue}>
            R${cost.replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorites}  
            style={[
                styles.favoriteButton, 
                teacher.is_favorite ? styles.favoritedButton : {}
            ]}
          >
            { teacher.is_favorite 
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

export default React.memo(TeacherItem);
