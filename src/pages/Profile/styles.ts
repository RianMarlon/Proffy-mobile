import { StyleSheet, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 400,
    backgroundColor: '#8257E5',
  },

  headerContent: {
    flex: 1,
    height: '100%',
    marginTop: 30,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  avatarContainer: {
    height: 120,
    width: 120,
    position: 'relative',
  },

  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },

  buttonCamera: {
    height: 40,
    width: 40,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: '#04D361',
  },

  teacherInfo: {
    width: '80%',
    marginTop: 20,
  },

  name: {
    minWidth: '100%',
    fontFamily: 'Archivo_700Bold',
    fontSize: 24,
    lineHeight: 25,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  class: {
    marginTop: 8,
    minWidth: '100%',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    color: '#D4C2FF',
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
    padding: 25,
    backgroundColor: '#FAFAFC',
    borderTopWidth: 1,
    borderTopColor: '#E6E6F0',
  },

  colorPrimary: {
    color: '#8257E5',
  },

  buttonSave: {
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
