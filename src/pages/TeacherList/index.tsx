import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import SelectPicker from '../../components/SelectPicker';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          const favoritedTeachers = JSON.parse(response);
          const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
            return teacher.id;
          });
          setFavorites(favoritedTeachersId);
        }
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      const paramsInitial = {
        subject: '',
        week_day: '',
        time: ''
      }
  
      api.get('/classes', { params: paramsInitial })
        .then((response) => {  
          setIsFiltersVisible(false);
          setTeachers(response.data);
        });
      loadFavorites();
    }, [])
  );

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const params = {
      subject,
      week_day,
      time
    }

    const response = await api.get('/classes', { params });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton 
            onPress={handleToggleFiltersVisible}
          >
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <SelectPicker 
              label="Matéria"
              selectedValue={subject}
              onValueChange={(itemValue) => setSubject(itemValue)}
              items={[
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Física', label: 'Física' },
                { value: 'Química', label: 'Quimíca' },
                { value: 'Português', label: 'Português' },
                { value: 'Redação', label: 'Redação' },
                { value: 'História', label: 'História' },
                { value: 'Filosofia', label: 'Filosofia' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Sociologia', label: 'Sociologia' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Espanhol', label: 'Espanhol' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Artes', label: 'Artes' }
              ]}
              sort
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
              <SelectPicker 
                label="Dia da semana"
                selectedValue={week_day}
                onValueChange={(itemValue) => setWeekDay(itemValue)}
                items={[
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda-feira' },
                  { value: '2', label: 'Terça-feira' },
                  { value: '3', label: 'Quarta-feira' },
                  { value: '4', label: 'Quinta-feira' },
                  { value: '5', label: 'Sexta-feira' },
                  { value: '6', label: 'Sábado' }
                ]}
                sort
              />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  maxLength={5}
                  keyboardType='numeric'
                  onChangeText={(text) => {
                    if (text.length === 2) setTime(text + ':');
                    else setTime(text);
                  }}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#C1BCCC"
                />
              </View>
            </View>
            
            <RectButton 
              style={styles.submitSearchButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitSearchButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher} 
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
