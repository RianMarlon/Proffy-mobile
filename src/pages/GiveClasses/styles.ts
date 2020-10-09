import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: -32,
    marginBottom: 32,
    paddingTop: 30,
    marginHorizontal: 20,
    overflow: 'hidden',
  },

  fieldset: {
    paddingHorizontal: 25,
  },

  lastFieldset: {
    marginTop: 50,
  },

  legendContainer: {
    borderBottomWidth: 1,
    borderColor: '#E6E6F0',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },

  legend: {
    color: '#32264D',
    fontFamily: 'Archivo_700Bold',
    fontSize: 20,
  },

  AvatarNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  name: {
    marginLeft: 16,
    color: '#32264D',
    fontFamily: 'Archivo_700Bold',
    fontSize: 20,
    lineHeight: 25,
  },

  lastInputContainer: {
    marginTop: 20,
  },

  buttonAddScheduleItemText: {
    padding: 8,
    color: '#8257E5',
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 14,
    lineHeight: 26,
  },

  lastScheduleItem: {
    marginTop: 40,
  },

  inputContainerSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  inputFrom: {
    width: '45%',
  },

  inputTo: {
    width: '45%',
  },

  removeScheduleItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  removeScheduleItemRowContainer: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeScheduleItemRow: {
    flex: 1,
    minWidth: '100%',
    maxHeight: 1,
    backgroundColor: '#E6E6F0',
  },

  buttonRemoveContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    minWidth: 130,
  },

  buttonRemoveScheduleItemText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#E33D3D',
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },

  footer: {
    marginTop: 40,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFC',
    borderTopWidth: 1,
    borderTopColor: '#E6E6F0',
  },

  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  imageWarning: {
    marginRight: 16,
  },

  warningTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  warningText: {
    color: '#A0A0B3',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },

  colorPrimary: {
    color: '#8257E5',
  },

  buttonSave: {
    marginBottom: 25,
    flex: 1,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04D361',
    borderRadius: 8,
  },

  buttonSaveText: {
    color: '#FFFFFF',
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 16,
    lineHeight: 26,
  },

});

export default styles;
