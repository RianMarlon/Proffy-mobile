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

  input: {
    height: 56,
    marginTop: 4,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFC',
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
  },

  inputContainerFocus: {
    flex: 1,
    height: 2,
    backgroundColor: '#9871F5',
    position: 'absolute',
    right: 16,
    bottom: 0,
    left: 16,
  },

  hasTextLeft: {
    paddingLeft: 42,
  },

  textLeft: {
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 0,
    paddingLeft: 20,
    height: 56,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
  }

});

export default styles;
