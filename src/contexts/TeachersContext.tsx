import React, { createContext, useState } from 'react';

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
  is_favorite: boolean,
}

interface ParamsFavoritesProps {
  page: number,
  per_page: number,
}

interface ParamsClassesProps {
  id_subject: string,
  week_day: string,
  time: string,
  page: number,
  per_page: number,
}

interface TeachersContextData {
  teachers: Teacher[],
  favorites: Teacher[],
  getTeachers(params: ParamsClassesProps): Promise<void>,
  getFavorites(params: ParamsFavoritesProps): Promise<void>,
  setTeachers(teacher: Teacher[]): void,
  setFavorites(teacher: Teacher[]): void,
  setQuantityFavorites(num: number): void,
  quantityTeachers: number,
  quantityFavorites: number,
}

const TeachersContext = createContext<TeachersContextData>({} as TeachersContextData);

export const TeachersProvider: React.FC = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<Teacher[]>([]);
  const [quantityTeachers, setQuantityTeachers] = useState(0);
  const [quantityFavorites, setQuantityFavorites] = useState(0);

  async function getFavorites(params: ParamsFavoritesProps) {
    if (params.per_page * params.page > quantityFavorites + params.per_page) {
      return;
    }

    const response = await api.get('/favorites', { params });

    if (response) {
      const data = response.data;
  
      const newFavorites = [...data.favorites_by_page];

      setQuantityFavorites(data.quantity_favorites);

      if (params.page === 1) {
        setFavorites([...newFavorites]);
      }

      else {
        setFavorites([...favorites, ...newFavorites]);
      }
    }
  }

  async function getTeachers(params: ParamsClassesProps) {
    if (params.per_page * params.page > quantityTeachers + params.per_page) {
      return;
    }

    const response = await api.get('/classes', { params });

    if (response) {
      const data = response.data;
  
      const newTeachers = [ ...data.classes_by_page ];

      setQuantityTeachers(data.quantity_teachers);

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
      value={{
        teachers, favorites, 
        getTeachers, getFavorites, 
        setTeachers, setFavorites, setQuantityFavorites,
        quantityTeachers, quantityFavorites
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
}

export default TeachersContext;
