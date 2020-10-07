import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  label: {
    color: '#9C98A6',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 22,
  },

  note: {
    color: '#C1BCCC',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 22,
  },

  error: {
    color: '#E83F5B',
  },

  textarea: {
    textAlignVertical: 'top',
    height: 250,
    marginTop: 4,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
    backgroundColor: '#F8F8FC',
    color: '#6A6180',
    fontFamily: 'Archivo_400Regular',
    fontSize: 14,
  },

  textareaContainerFocus: {
    flex: 1,
    height: 2,
    backgroundColor: '#9871F5',
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },

});

export default styles;
