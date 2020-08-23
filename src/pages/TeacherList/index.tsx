import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import SelectPicker from '../../components/SelectPicker';
import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import styles from './styles';
import TeacherItem from '../../components/TeacherItem';

interface TeacherItemProps {
  item: Teacher,
}

function TeacherList() {
  const { teachers, getTeachers, quantityTeachers, quantityClasses } = useContext(TeachersContext);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 2;

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    if (perPage * page > quantityClasses + perPage) {
      return;
    }

    const params = {
      subject,
      week_day: weekDay,
      time,
      page,
      per_page: perPage,
    }

    setLoading(true);

    await getTeachers(params);

    setLoading(false);

    setPage(page + 1);
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    const params = {
      subject,
      week_day: weekDay,
      time,
      page: 1,
      per_page: perPage,
    }

    await getTeachers(params);

    setPage(2);
    setIsFiltersVisible(false);
  }

  function handleOnRefresh() {
    setPage(1);
    setRefreshing(true);
    loadTeachers();
    setRefreshing(false);
  }

  function addDigitInTime(digit: string) {
    if (!digit.includes(':')) {
      if (digit.length === 2) {
        digit = digit + ':';
      }

      else if (digit.length === 5) {
        digit = digit.slice(0, 2) + ':' + digit.slice(3, 5);
      }
    }

    else {
      if (digit.length === 5) {
        const array = digit.split(':').map((value) => parseInt(value));

        if (isNaN(array[0]) || isNaN(array[1])) {
          digit = '00:00';
        }
        
        else if ((array[0] > 23 || array[0] < 0)
          || (array[1] > 59 || array[1] < 0)) {
            digit = '00:00';
        }
      }
    }
    
    setTime(digit);
  }

  function renderTeacherItem({ item }: TeacherItemProps) {
    return (
      <View>
        <TeacherItem teacher={item} />
      </View>
    );
  }
  
  function renderLoader() {
    if (!loading) return null;

    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#8257E5" />
      </View>
    );
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
                quantityTeachers > 1 
                ? `${quantityTeachers} proffys`
                : `${quantityTeachers} proffy`
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
              <View style={styles.inputWeekDay}>
                <SelectPicker 
                  label="Dia da semana"
                  selectedValue={weekDay}
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

              <View style={styles.inputTime}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  maxLength={5}
                  keyboardType='numeric'
                  onChangeText={addDigitInTime}
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

      { teachers.length > 0 && (
        <FlatList
          style={styles.teacherList}
          data={teachers}
          renderItem={renderTeacherItem}
          keyExtractor={(item) => {
            return `${item.id}`;
          }}
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          onEndReached={loadTeachers}
          onEndReachedThreshold={0.1}
          ListFooterComponent = {renderLoader}
        />
      )}
    </View>
  );
}

export default TeacherList;
