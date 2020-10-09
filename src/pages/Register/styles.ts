import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },

  buttonBackContainer: {
    width: '100%',
    marginLeft: -10,
    marginTop: 20,
    marginBottom: 70,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ellipseContainer: {
    flexDirection: 'row',
  },

  ellipse: {
    marginLeft: 10,
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#C1BCCC',
  },

  ellipseActivated: {
    backgroundColor: '#8257E5',
  },

  titleContainer: {
    marginBottom: 20,
    paddingRight: 50,
  },

  title: {
    marginBottom: 10,
    color: '#32264D',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    lineHeight: 42,
  },

  description: {
    marginRight: '10%',
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
  },

  formContainer: {
    marginVertical: 50,
    maxWidth: 400,
    width: '100%',
  },

  descriptionContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 25,
    paddingRight: 10,
  },

  descriptionPage: {
    color: '#32264D',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 34,
  },

  button: {
    flex: 1,
    marginTop: 25,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04D361',
    borderRadius: 8,
  },

  buttonLast: {
    backgroundColor: '#8257E5',
  },

  buttonRegister: {
    backgroundColor: '#04D361',
  },

  buttonDisabled: {
    backgroundColor: '#DCDCE5',
  },

  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 16,
    lineHeight: 26,
  },

  buttonTextDisabled: {
    color: '#9C98A6',
  },

});

export default styles;
