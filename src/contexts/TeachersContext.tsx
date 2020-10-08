import React, { createContext, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export interface Schedule {
  id_class_schedule: number,
  week_day: string,
  from: string,
  to: string,
}

export interface Teacher {
  id_class: number,
  avatar: string,
  first_name: string,
  last_name: string,
  email: string,
  subject: string,
  biography: string,
  cost: string,
  whatsapp: string,
  schedules: [Schedule],
  favorited?: boolean,
}

interface ParamsProps {
  id_subject: string,
  week_day: string,
  time: string,
  page: number,
  per_page: number,
}

interface TeachersContextData {
  teachers: Teacher[],
  getTeachers(params: ParamsProps): Promise<void>,
  setTeachers(teacher: Teacher[]): void,
  quantityTeachers: number,
  quantityClasses: number,
}

const TeachersContext = createContext<TeachersContextData>({} as TeachersContextData);

export const TeachersProvider: React.FC = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [quantityTeachers, setQuantityTeachers] = useState(0);
  const [quantityClasses, setQuantityClasses] = useState(0);

  async function getFavorites() {
    const response = await AsyncStorage.getItem('@proffy/favorites');

    if (response) {
      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
        return teacher.id_class;
      });

      return [ ...favoritedTeachersIds ];
    }
  }

  async function getTeachers(params: ParamsProps) {
    if (params.per_page * params.page > quantityClasses + params.per_page) {
      return;
    }

    const response = await api.get('/classes', { params });

    if (response) {
      const data = response.data;
      const allFavorites = await getFavorites() || [];
  
      const newTeachers = data.classesByPage.map((teacher: Teacher) => {
        const newTeacher: Teacher = { ...teacher, favorited: false };
        if (allFavorites.includes(teacher.id_class)) {
          newTeacher.favorited = true;
        }
  
        return { ...newTeacher };
      });

      setQuantityTeachers(data.quantityTeachers);
      setQuantityClasses(data.quantityClasses);

      if (params.page === 1) {
        setTeachers([...newTeachers]);
      }

      else {
        setTeachers([...teachers, ...newTeachers]);
      }
    }
  }

  return (
    <TeachersContext.Provider 
      value={{teachers, getTeachers, setTeachers, quantityTeachers, quantityClasses}}
    >
      {children}
    </TeachersContext.Provider>
  );
}

export default TeachersContext;
