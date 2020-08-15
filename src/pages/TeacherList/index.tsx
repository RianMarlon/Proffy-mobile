import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import SelectPicker from '../../components/SelectPicker';
import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import styles from './styles';

function TeacherList() {
  const { teachers, getTeachers } = useContext(TeachersContext);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const params = {
      subject: '',
      week_day: '',
      time: '',
    }

    getTeachers(params).then(() => {
      setIsFiltersVisible(false);
    });
  }, []);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  function handleFiltersSubmit() {
    const params = {
      subject,
      week_day,
      time
    }
    
    getTeachers(params).then(() => {
      setIsFiltersVisible(false);
    });
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        namePage="Estudar"
        title="Proffys disponíveis"
        headerRight={(
          <View style={styles.infoNumberTeacher}>
            <Text style={styles.emoji}>
              🤓
            </Text>
            <Text style={styles.numberTeachers}>
              { 
                teachers.length > 1 
                ? `${teachers.length} proffys`
                : `${teachers.length} proffy`
              }
            </Text>
          </View>
        )}
      >
        <View style={styles.buttonFiltersGroup}>
          <BorderlessButton 
            onPress={handleToggleFiltersVisible}
            style={styles.buttonFilters}
          >
            <Feather name="filter" size={20} color="#04D361" />
            <Text style={styles.buttonText}>Filtrar por dia, matéria e hora</Text>
            <Feather 
              name={isFiltersVisible ? 'chevron-up' : 'chevron-down'} 
              size={20}
              color="#A380F6"
            />
          </BorderlessButton>
        </View>

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
                    if (!text.includes(':')) {
                      if (text.length === 2) {
                        text = text + ':';
                      }

                      else if (text.length === 5) {
                        text = text.slice(0, 2) + ':' + text.slice(3, 5);
                      }
                    }

                    else {
                      if (text.length === 5) {
                        const array = text.split(':').map((value) => parseInt(value));

                        if (isNaN(array[0]) || isNaN(array[1])) {
                          text = '00:00';
                        }
                        
                        else if ((array[0] > 23 || array[0] < 0)
                          || (array[1] > 59 || array[1] < 0)) {
                            text = '00:00';
                        }
                      }
                    }
                    
                    setTime(text);
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
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
