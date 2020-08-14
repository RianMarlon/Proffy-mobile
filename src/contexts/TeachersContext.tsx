import React, { createContext, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export interface Teacher {
  id: number,
  avatar: string,
  name: string,
  subject: string,
  biography: string,
  cost: number,
  whatsapp: string,
  favorited?: boolean,
}

interface ParamsProps {
  subject: string,
  week_day: string,
  time: string 
}

interface TeachersContextData {
  teachers: Teacher[],
  getTeachers(params: ParamsProps): Promise<void>,
  setTeachers(teacher: Teacher[]): void,
}

const TeachersContext = createContext<TeachersContextData>({} as TeachersContextData);

export const TeachersProvider: React.FC = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  async function getFavorites() {
    const response = await AsyncStorage.getItem('favorites')

    if (response) {
      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
        return teacher.id
      });
      setFavorites(favoritedTeachersIds);
    }
  }

  async function getTeachers(params: ParamsProps) {
    getFavorites();

    const response = await api.get('/classes', { params })

    if (response) {
      const data = response.data;
  
      data.map((teacher: Teacher) => {
        const newTeacher: Teacher = { ...teacher, favorited: false };
        if (favorites.includes(teacher.id)) {
          newTeacher.favorited = true;
        }
  
        return teacher;
      });
  
      setTeachers(data);
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
