import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8257E5',
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 25,
    paddingBottom: 5,
    backgroundColor: '#774DD6',
  },

  buttonBack: {
    padding: 10,
    marginLeft: -10,
    marginRight: -10,
  },

  namePage: {
    fontFamily: 'Archivo_500Medium',
    fontSize: 14,
    lineHeight: 15,
    color: '#D4C2FF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40,
  },

  children: {
    paddingHorizontal: 40,
  },

});

export default styles;