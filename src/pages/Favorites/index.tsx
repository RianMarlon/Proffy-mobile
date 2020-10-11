import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import TeachersContext, { Teacher } from '../../contexts/TeachersContext';

import inLoveIcon from '../../assets/images/icons/in-love.png';

import styles from './styles';

interface FavoriteItemProps {
  item: Teacher,
}

function Favorites() {
  const {
    favorites, getFavorites,
    quantityFavorites
  } = useContext(TeachersContext);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const [showLoading, setShowLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(false);

  useEffect(() => {
    loadTeachers()
      .catch(() => {
        setIsFirstSearch(true);
      });
  }, []);

  async function loadTeachers() {
    if (quantityFavorites > 0 && perPage * page >= quantityFavorites + perPage) {
      return;
    }

    const params = {
      page,
      per_page: perPage,
    }

    setShowLoading(true);

    await getFavorites(params);

    setShowLoading(false);

    setPage(page + 1);
  }

  function handleOnRefresh() {
    setPage(1);
    setRefreshing(true);
    loadTeachers();
    setRefreshing(false);
  }

  function renderFavoriteItem({ item }: FavoriteItemProps) {
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

      { favorites.length > 0 && (
        <FlatList
          style={styles.favorites}
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => {
            return `${item.id_class}`;
          }}
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          onEndReached={loadTeachers}
          onEndReachedThreshold={0.5}
          ListFooterComponent = {renderLoading}
        />
      )}
    </View>
  );
}

export default Favorites;
