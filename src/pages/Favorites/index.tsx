import React, { useContext } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import inLoveIcon from '../../assets/images/icons/in-love.png';

import styles from './styles';

function Favorites() {
  const { teachers } = useContext(TeachersContext);
  const isFavorited = (teacher: Teacher) => teacher.favorited;
  const quantityFavorites = teachers.filter(isFavorited).length;

  return (
    <View style={styles.container}>
      <PageHeader 
        namePage="Estudar"
        title="Meus proffys favoritos"
        headerRight={(
          <View style={styles.infoNumberTeacher}>
            <View style={styles.emoji}>
              <Image source={inLoveIcon} />
            </View>
            <Text style={styles.numberTeachers}>
              { quantityFavorites > 1
                ? `${quantityFavorites} proffys`
                : `${quantityFavorites} proffy`
              }
            </Text>
          </View>
        )}
      />

      <ScrollView
        style={styles.favorites}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.filter(isFavorited).map((teacherFavorited: Teacher) => {
          return (
            <TeacherItem 
              key={teacherFavorited.id}
              teacher={teacherFavorited}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
