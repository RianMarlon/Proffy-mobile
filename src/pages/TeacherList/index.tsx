import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import TeachersContext, { Teacher } from '../../contexts/TeachersContext';
import AuthContext from '../../contexts/AuthContext';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import SelectPicker from '../../components/SelectPicker';
import TeacherItem from '../../components/TeacherItem';

import smileIcon from '../../assets/images/icons/smile.png';

import styles from './styles';

interface TeacherItemProps {
  item: Teacher,
}

function TeacherList() {

  const { checkToken } = useContext(AuthContext);
  
  const {
    teachers, getTeachers,
    quantityTeachers
  } = useContext(TeachersContext);

  const [idSubject, setIdSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [page, setPage] = useState(1);
  const perPage = 5;

  const [subjects, setSubjects] = useState<any>([
    { id: '', subject: '' }
  ]);

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(false);

  useEffect(() => {
    checkToken();
    (async () => {
      try {
        const response = await api.get('/subjects');
        const { subjects } = response.data;
        setSubjects([ ...subjects ]);

        await loadTeachers();
      }
      finally {
        setIsFirstSearch(true);
      }
    })();
  }, []);

  async function loadTeachers() {
    if (perPage * page > quantityTeachers + perPage) {
      return;
    }

    const params = {
      id_subject: idSubject,
      week_day: weekDay,
      time,
      page,
      per_page: perPage,
    }

    setShowLoading(true);

    await getTeachers(params);

    setShowLoading(false);

    setPage(page + 1);
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    const params = {
      id_subject: idSubject,
      week_day: weekDay,
      time,
      page: 1,
      per_page: perPage,
    }

    try {
      await getTeachers(params);
    }

    finally {
      setIsFirstSearch(true);
    }

    setPage(2);
    setIsFiltersVisible(false);
  }

  function handleOnRefresh() {
    setPage(1);
    setRefreshing(true);
    loadTeachers();
    setRefreshing(false);
  }

  function addValueInTime(newValue: string) {
    newValue = newValue.trim();

    if (!newValue.includes(':')) {
      if (newValue.length === 2) {
        newValue = newValue + ':';
      }

      else if (newValue.length === 5) {
        newValue = newValue.slice(0, 2) + ':' + newValue.slice(3, 5);
      }
    }

    else {
      if (newValue.length === 5) {
        const array = newValue.split(':').map((value) => parseInt(value));

        if (isNaN(array[0]) || isNaN(array[1])) {
          newValue = '00:00';
        }
        
        else if ((array[0] > 23 || array[0] < 0)
          || (array[1] > 59 || array[1] < 0)) {
            newValue = '00:00';
        }
      }
    }
    
    setTime(newValue);
  }

  function renderTeacherItem({ item }: TeacherItemProps) {
    return (
      <View>
        <TeacherItem teacher={item} />
      </View>
    );
  }
  
  function renderLoading() {
    if (!showLoading) return null;

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
            <View style={styles.emoji}>
              <Image source={smileIcon} />
            </View>
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
              labelColor="#D4C2FF"
              selectedValue={idSubject}
              onValueChange={(newValue) => setIdSubject(newValue)}
              items={subjects.map((subject: { id: number, subject: string }) => {
                return { value: `${subject.id}`, label: subject.subject }
              })}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputWeekDay}>
                <SelectPicker 
                  label="Dia da semana"
                  labelColor="#D4C2FF"
                  selectedValue={weekDay}
                  onValueChange={(newValue) => setWeekDay(newValue)}
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
                <Input 
                  label="Horário"
                  labelColor="#D4C2FF"
                  value={time}
                  maxLength={5}
                  keyboardType='numeric'
                  onChangeText={addValueInTime}
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

      { teachers.length > 0 ? (
          <FlatList
            style={styles.teacherList}
            data={teachers}
            renderItem={renderTeacherItem}
            keyExtractor={(item) => {
              return `${item.id_class}`;
            }}
            refreshing={refreshing}
            onRefresh={handleOnRefresh}
            onEndReached={loadTeachers}
            onEndReachedThreshold={0.5}
            ListFooterComponent = {renderLoading}
          />
        ) : (
          isFirstSearch && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                Nenhum professor encontrado.
              </Text>
            </View>
          )
        )
      }
    </View>
  );
}

export default TeacherList;
