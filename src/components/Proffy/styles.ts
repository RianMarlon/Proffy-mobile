import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  proffyContainer: {
    flex: 1,
    backgroundColor: '#8257E5',
    padding: 40,
  },

  proffyBackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    height: 200,
    width: 180,
    justifyContent: 'center',
    alignContent: 'flex-start',
  },

  logo: {
    height: 55,
    width: 180,
    resizeMode: 'contain',
  },

  sloganContainer: {
    marginTop: 8,
    paddingRight: 50,
  },

  textSlogan: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 24,
  },
});

export default styles;
