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
    fontFamily: 'Poppins_400Regular',
    marginRight: 8,
    fontSize: 16,
  },

  numberTeachers: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#D4C2FF',
  },

  favorites: {
    marginTop: -40,
  },
});

export default styles;
