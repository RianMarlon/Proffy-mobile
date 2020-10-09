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
    paddingVertical: 60,
    paddingHorizontal: 35,
  },

  mainContainer: {
    maxWidth: 400,
    width: '100%',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  title: {
    color: '#32264D',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 34,
  },

  buttonCreateAccountText: {
    color: '#8257E5',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 24,
  },

  extraContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkBackgroundImage: {
    width: 15,
    height: 20,
  },

  checkNoContainer: {
    backgroundColor: '#FFFFFF',
  },

  checkYesContainer: {
    backgroundColor: '#04D361',
  },

  rememberMeText: {
    marginLeft: 8,
    color: '#9C98A6',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 24,
  },
  
  buttonForgotPasswordText: {
    color: '#9C98A6',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 24,
    textDecorationLine: 'underline',
  },

  buttonLogin: {
    flex: 1,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04D361',
    borderRadius: 8,
  },

  buttonLoginDisabled: {
    backgroundColor: '#DCDCE5',
  },

  buttonLoginText: {
    color: '#FFFFFF',
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 16,
    lineHeight: 26,
  },

  buttonLoginTextDisabled: {
    color: '#9C98A6',
  },

});

export default styles;
