import React, { useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import styles from './styles';

function Favorites() {
  const { teachers } = useContext(TeachersContext);

  return (
    <View style={styles.container}>
      <PageHeader namePage="Estudar" title="Meus proffys favoritos" />

      <ScrollView
        style={styles.favorites}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.filter((teacher: Teacher) => teacher.favorited)
          .map((teacherFavorited: Teacher) => {
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
