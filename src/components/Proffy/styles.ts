import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  proffyContainer: {
    flex: 1,
    backgroundColor: '#8257E5',
    height: 300,
  },

  proffyBackgroundImage: {
    flex: 1,
    margin: 40,
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
    width: 160,
    resizeMode: 'contain',
  },

  sloganContainer: {
    marginTop: 8,
    paddingRight: 50,
  },

  textSlogan: {
    width: 130,
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 24,
  },
});

export default styles;
