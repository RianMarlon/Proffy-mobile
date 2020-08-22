import React, { createContext, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export interface Schedule {
  id: number,
  week_day: string,
  from: string,
  to: string,
}

export interface Teacher {
  id: number,
  avatar: string,
  name: string,
  subject: string,
  biography: string,
  cost: number,
  whatsapp: string,
  schedules: [Schedule],
  favorited?: boolean,
}

interface ParamsProps {
  subject: string,
  week_day: string,
  time: string,
}

interface TeachersContextData {
  teachers: Teacher[],
  getTeachers(params: ParamsProps): Promise<void>,
  setTeachers(teachers: Teacher[]): void,
}

const TeachersContext = createContext<TeachersContextData>({} as TeachersContextData);

export const TeachersProvider: React.FC = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  async function getFavorites() {
    const response = await AsyncStorage.getItem('favorites');

    if (response) {
      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
        return teacher.id
      });

      setFavorites([ ...favoritedTeachersIds ]);
      return [ ...favoritedTeachersIds ];
    }
  }

  async function getTeachers(params: ParamsProps) {
    const response = await api.get('/classes', { params });

    if (response) {
      const data = response.data;
      const allFavorites = await getFavorites() || [];

      const newTeachers = data.map((teacher: Teacher) => {
        const newTeacher: Teacher = { ...teacher, favorited: false };
        if (allFavorites.includes(teacher.id)) {
          newTeacher.favorited = true;
        }
  
        return { ...newTeacher };
      });

      setTeachers([ ...newTeachers ]);
    }
  }

  return (
    <TeachersContext.Provider 
      value={{teachers, getTeachers, setTeachers}}
    >
      {children}
    </TeachersContext.Provider>
  )
}

export default TeachersContext;
