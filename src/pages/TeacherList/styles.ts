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
    lineHeight: 22,
  },

  inputGroup: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputWeekDay: {
    width: '64%',
  },

  inputTime: {
    width: '32%',
  },

  input: {
    height: 54,
    marginTop: 4,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
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
