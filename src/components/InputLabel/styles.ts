import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 64,
  },

  label: {
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 25,
    height: 64,
    color: '#9C98A6',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
  },

  labelFocus: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    transform: [{
      translateY: -12
    }],
    fontSize: 10,
  },

  error: {
    color: '#E83F5B',
  },

  input: {
    padding: 25,
    backgroundColor: '#FAFAFC',
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
  },

  inputFocus: {
    paddingTop: 30,
    paddingBottom: 12,
  },

  inputContainerFocus: {
    flex: 1,
    width: 2,
    height: 45,
    position: 'absolute',
    top: 10,
    left: 0,
    backgroundColor: '#9871F5',
  },
  
  buttonRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    height: 64,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hasButtonRight: {
    paddingRight: 55,
  },

});

export default styles;
