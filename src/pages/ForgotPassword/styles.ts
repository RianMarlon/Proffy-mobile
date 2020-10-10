import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  header: {
    width: '100%',
    height: 300,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 35,
  },

  mainContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },

  buttonBackContainer: {
    marginLeft: -10,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },

  formContainer: {
    marginVertical: 50,
    maxWidth: 400,
    width: '100%',
  },

  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 25,
    paddingRight: 10,
  },

  title: {
    color: '#32264D',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 34,
  },

  description: {
    width: '80%',
    marginTop: 10,
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
  },

  buttonForgotPassword: {
    flex: 1,
    marginTop: 25,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04D361',
    borderRadius: 8,
  },

  buttonForgotPasswordDisabled: {
    backgroundColor: '#DCDCE5',
  },

  buttonForgotPasswordText: {
    color: '#FFFFFF',
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 16,
    lineHeight: 26,
  },

  buttonForgotPasswordTextDisabled: {
    color: '#9C98A6',
  },

});

export default styles;
