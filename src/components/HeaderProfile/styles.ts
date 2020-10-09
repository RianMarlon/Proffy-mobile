import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonAvatarName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  name: {
    marginLeft: 12,
    color: '#D4C2FF',
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    lineHeight: 22,
  },

  buttonOff: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0001',
    borderRadius: 8,
  },

  imageButtonOff: {
    width: 20,
    height: 20,
  },

});

export default styles;
