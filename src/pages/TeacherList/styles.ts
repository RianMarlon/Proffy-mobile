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

  buttonFiltersGroup: {
    borderBottomWidth: 1,
    borderBottomColor: '#9871F5',
    marginTop: -20,
    marginBottom: 30,
  },

  buttonFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },

  buttonText: {
    fontSize: 16,
    color: '#D4C2FF',
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBlock: {
    width: '48%',
  },

  input: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16
  },

  submitSearchButton: {
    backgroundColor: '#04D361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitSearchButtonText: {
    color: '#FFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },

  teacherList: {
    marginTop: -40,
  },
});

export default styles;
