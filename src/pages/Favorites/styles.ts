import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  infoNumberTeacher: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  emoji: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  numberTeachers: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#D4C2FF',
  },

  favorites: {
    marginTop: -40,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },

  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noResultsText: {
    width: '90%',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#9C98A6',
  },
});

export default styles;
