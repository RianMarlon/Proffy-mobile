import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    backgroundColor: '#8257E5',
    justifyContent: 'center',
    padding: 40,
  },

  successBackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successCheckIcon: {
    height: 80,
    width: 80,
  },

  content: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    maxWidth: 220,
    textAlign: 'center',
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 32,
    lineHeight: 37,
  },

  description: {
    marginTop: 24,
    marginHorizontal: 40,
    textAlign: 'center',
    color: '#D4C2FF',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins_400Regular',
  },

  okButton: {
    marginVertical: 40,
    backgroundColor: '#04D361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  okButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
});

export default styles;
