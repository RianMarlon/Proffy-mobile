import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6E6F0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEE',
  },

  profileInfo: {
    marginHorizontal: 16,
  },

  name: {
    color: '#32264D',
    fontFamily: 'Archivo_700Bold',
    fontSize: 22,
    lineHeight: 24,
    marginRight: '20%',
  },

  subject: {
    fontFamily: 'Poppins_400Regular',
    color: '#646180',
    fontSize: 14,
    marginTop: 4,
  },

  biography: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 27,
    color: '#6A6180',
  },

  schedules: {
    borderTopColor: '#E6E6F0',
    borderTopWidth: 1,
    borderBottomColor: '#E6E6F0',
    borderBottomWidth: 1,
    padding: 24,
  },

  schedulesTitlesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  schedulesTitleText: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
  },

  schedulePill: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    borderColor: '#FAFAFC',
    borderWidth: 1,
  },
  
  scheduleText: {
    fontFamily: 'Archivo_700Bold',
    color: '#6A6180',
  },

  arrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowBase: {
    height: 2,
    width: 70,
    backgroundColor: '#E6E6F0',
  },

  arrowTip: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },

  arrowTipTop: {
    marginBottom: 2,
    height: 2,
    width: 10,
    backgroundColor: '#E6E6F0',
    transform: [
      { rotateY: "40deg" },
      { rotateZ: "40deg" },
    ],
  },

  arrowTipBottom: {
    marginTop: 2,
    height: 2,
    width: 10,
    backgroundColor: '#E6E6F0',
    transform: [
      { rotateY: "-40deg" },
      { rotateZ: "-40deg" },
    ],
  },

  footer: {
    backgroundColor: '#FAFAFC',
    padding: 24,
    alignItems: 'center',
  },

  price: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 14,
  },

  priceValue: {
    fontFamily: 'Archivo_700Bold',
    color: '#8257E5',
    fontSize: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },

  favoriteButton: {
    backgroundColor: '#8257E5',
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  favoritedButton: {
    backgroundColor: '#E33D3D',
  },

  contactButton: {
    backgroundColor: '#04D361',
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  contactButtonText: {
    color: '#FFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default styles;
