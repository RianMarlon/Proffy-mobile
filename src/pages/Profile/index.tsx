import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, ImageBackground, Platform } from 'react-native';
import { RectButton  } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';

import api from '../../services/api';
import useForm from '../../hooks/useForm';

import AuthContext from '../../contexts/AuthContext';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import SelectPicker from '../../components/SelectPicker';
import Success from '../../components/Success';

import profileBackground from '../../assets/images/profile-background.png';
import cameraIcon from '../../assets/images/icons/camera-icon.png';

import styles from './styles';

function Profile() {

  const { checkToken } = useContext(AuthContext);

  const initialFields = {
    whatsapp: '',
    biography: '',
    cost: ''
  }

  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty, resetFields,
    updateForm
  ] = useForm(initialFields);

  const initialStateScheduleItems = [
    { week_day: '', from: '', to: '' }
  ];

  const [me, setMe] = useState({
    avatar: '',
    first_name: '',
    last_name: '',
    email: '',
    whatsapp: '',
    biography: '',
    subject: '',
    cost: '',
    schedules: [],
  });

  const [avatar, setAvatar] = useState({
    uri: '',
    name: '',
    type: '',
  });

  const [scheduleItems, setScheduleItems] = useState([...initialStateScheduleItems]);

  const [isSuccess, setIsSuccess] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisibility, setToastVisibility] = useState(false);
  const [toastBackgroundColor, setToastBackgroundColor] = useState('#07BC0C');

  useEffect(() => {
    checkToken();
    
    if (Platform.OS !== 'web') {
      ImagePicker.requestCameraRollPermissionsAsync()
        .then((response) => {
          const { status } = response;

          if (status !== 'granted') {
            alert('Desculpe, mas precisamos da permissão da sua câmera!');
          }
        });
    }
    
    api.get('/me')
      .then(response => {
        const { user } = response.data;

        if (user.isTeacher) {
          const cost = parseFloat(user.cost).toFixed(2).replace('.', ',');

          updateForm({
            whatsapp: user.whatsapp,
            biography: user.biography,
            cost,
          });

          setScheduleItems([...user.schedules]);
        }
        
        setMe({ ...user });
      });

    // eslint-disable-next-line
  }, []);

  
  function addValueInTime(index: number, field: string, newValue: string) {
    newValue = newValue.trim();

    if (!newValue.includes(':')) {
      if (newValue.length === 2) {
        newValue = newValue + ':';
      }

      else if (newValue.length === 5) {
        newValue = newValue.slice(0, 2) + ':' + newValue.slice(3, 5);
      }
    }

    else {
      if (newValue.length === 5) {
        const array = newValue.split(':').map((value) => parseInt(value));

        if (isNaN(array[0]) || isNaN(array[1])) {
          newValue = '00:00';
        }
        
        else if ((array[0] > 23 || array[0] < 0)
          || (array[1] > 59 || array[1] < 0)) {
            newValue = '00:00';
        }
      }
    }
    
    setScheduleItemValue(index, field, newValue);
  }

  function addNumber(field: string, newValue: string) {
    const regex = /^[0-9]+$/;

    if (regex.test(newValue) || newValue.trim() == "") {
      updateField(field, newValue.trim());
    }
  }

  function addMoney(field: string, newValue: string) {
    const regex = /^[\d,.]+$/;

    if (regex.test(newValue) || newValue.trim() == '') {
      updateField(field, newValue.trim());
    }
  }

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      ...initialStateScheduleItems
    ]);
  }

  function removeScheduleItem(index: number) {
    const hasDifferentIndex = (scheduleItem: any, indexSchedule: number) => indexSchedule !== index; 
    const newScheduleItems = scheduleItems.filter(hasDifferentIndex);

    setScheduleItems([
      ...newScheduleItems
    ]);
  }
  
  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      const isSamePosition = index === position;

      if (isSamePosition) {
        return { ...scheduleItem, [field]: value };
      }

      else {
        return scheduleItem;
      }
    });
    
    setScheduleItems(updatedScheduleItems);
  }

  async function pickImage() {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    const avatarUri = Platform.OS === 'android'
      ? data.uri 
      : data.uri.replace('file://', '');
    const name = avatarUri.split('/').pop();
    const fileType = avatarUri.split('.').pop();

    setAvatar({
      uri: avatarUri,
      name: name ? name : '',
      type: `image/${fileType}`
    });
  };
  
  function handleSubmitProfile() {
    const fd = new FormData();
    
    if (avatar.uri) {
      fd.append('avatar', avatar);

      api.put('/me', fd, {
          onUploadProgress: (progressEvent) => {
            console.log('Progress event: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
          }
        })  
        .then(() => {
          const messageSuccess = 'Imagem alterada com sucesso!';
          setToastMessage(messageSuccess);
          setToastBackgroundColor('#07BC0C');

          setToastVisibility(true);
          setTimeout(() => setToastVisibility(false), 5000); 
        })
        .catch(({ response }) => {
          const data = response.data;
          const messageError = data.error ? data.error 
            : 'Ocorreu um erro inesperado!';

          setToastMessage(messageError);
          setToastBackgroundColor('#E74C3C');

          setToastVisibility(true);
          setTimeout(() => setToastVisibility(false), 5000); 
        });
    }

    validateFields();
        
    if (hasOneFieldEmpty()) {
      return;
    }

    const data = {
      whatsapp: form.whatsapp,
      biography: form.biography,
      subject: form.subject,
      cost: form.cost,
      schedules: scheduleItems
    }
    
    api.put('/me', data)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(({ response }) => {
        const data = response.data;
        const messageError = data.error ? data.error 
          : 'Ocorreu um erro inesperado!';

        setToastMessage(messageError);
        setToastBackgroundColor('#E74C3C');

        setToastVisibility(true);
        setTimeout(() => setToastVisibility(false), 5000); 
      });
  }

  return (
    <>
      {
        !isSuccess ? (
          <ScrollView style={styles.container}>
            <Toast
              visible={toastVisibility}
              textColor="#FFFFFF"
              backgroundColor={toastBackgroundColor}
              opacity={1}
              position={50}
              shadow={false}
              animation={false}
              hideOnPress={true}
            >
              { toastMessage }
            </Toast>
            <View style={styles.header}>
              <Navbar 
                namePage="Meu perfil"
              />
              <View style={styles.headerContent}>
                <ImageBackground 
                  source={profileBackground}
                  resizeMode="contain"
                  style={styles.imageBackground}
                >
                  <View style={styles.avatarContainer}>
                    <Image 
                      source={{
                        uri: avatar.uri
                          || me.avatar
                          || 'https://www.gravatar.com/avatar/f9879d71855b5ff21e4963273a886bfc?d=retro&r=g'
                      }}
                      style={styles.avatar}
                    />
                    <RectButton 
                      onPress={pickImage}
                      style={styles.buttonCamera}
                    >
                      <Image source={cameraIcon} />
                    </RectButton>
                  </View>

                  <View style={styles.teacherInfo}>
                    <Text style={styles.name}>
                      {me.first_name}
                    </Text>
                    <Text style={styles.class}>
                      {me.subject}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </View>

            <View style={styles.main}>
              <View>
                <View style={styles.fieldset}>
                  <View style={styles.legendContainer}>
                    <Text style={styles.legend}>Seus dados</Text>
                  </View>
                  <View>
                    <Input
                      label="Nome"
                      value={me.first_name}
                      editable={false}
                    />
                  </View>
                  <View style={styles.lastInputContainer}>
                    <Input
                      label="Sobrenome"
                      value={me.last_name}
                      editable={false}
                    />
                  </View>
                  <View style={styles.lastInputContainer}>
                    <Input
                      label="E-mail"
                      value={me.email}
                      editable={false}
                    />
                  </View>
                  <View style={styles.lastInputContainer}>
                    <Input
                      placeholder="Ex: 5585992820129"
                      label="Whatsapp"
                      labelError="Whatsapp não informado"
                      error={errors.whatsapp}
                      value={form.whatsapp}
                      onChangeText={(newValue) => addNumber('whatsapp', newValue)}
                      keyboardType="numeric"
                      required={true}
                    />
                  </View>
                  <View style={styles.lastInputContainer}>
                    <Textarea
                      label="Biografia"
                      note="Máximo de 500 caracteres"
                      labelError="Biografia não informada"
                      error={errors.biography}
                      value={form.biography}
                      onChangeText={(newValue) => updateField('biography', newValue)}
                      required={true}
                      maxLength={500}
                      multiline={true}
                      numberOfLines={10}
                    />
                  </View>
                </View>

                <View style={[styles.fieldset, styles.lastFieldset]}>
                  <View style={styles.legendContainer}>
                    <Text style={styles.legend}>Sobre a aula</Text>
                  </View>
                  <View>
                    <SelectPicker 
                      selectedValue={me.subject}
                      label="Matéria"
                      labelColor="#9C98A6"
                      labelError="Matéria não informada"
                      error={errors.subject}
                      required={true}
                      items={[
                        { value: me.subject, label: me.subject},
                      ]}
                      enabled={false}
                    />
                  </View>
                  <View style={styles.lastInputContainer}>
                    <Input
                      textLeftInput="R$"
                      label="Custo da hora por aula"
                      labelError="Preço não informado"
                      error={errors.cost}
                      value={form.cost}
                      onChangeText={(newValue) => addMoney('cost', newValue)}
                      keyboardType="numeric"
                      required={true}
                    />
                  </View>
                </View>

                <View style={[styles.fieldset, styles.lastFieldset]}>
                  <View style={styles.legendContainer}>
                    <Text style={styles.legend}>
                      Horários disponíveis
                    </Text>
                    <RectButton onPress={addNewScheduleItem}>
                      <Text style={styles.buttonAddScheduleItemText}>
                        + Novo
                      </Text>
                    </RectButton>
                  </View>
                
                  {scheduleItems.map((scheduleItem, index) => {
                    return (
                      <View key={index} style={index > 0 && styles.lastScheduleItem}>
                        <View>
                          <SelectPicker
                            selectedValue={scheduleItem.week_day.toString()}
                            onValueChange={(newValue) => setScheduleItemValue(index, 'week_day', newValue)}
                            label="Dia da semana"
                            labelColor="#9C98A6"
                            items={[
                              { value: '0', label: 'Domingo' },
                              { value: '1', label: 'Segunda-feira' },
                              { value: '2', label: 'Terça-feira' },
                              { value: '3', label: 'Quarta-feira' },
                              { value: '4', label: 'Quinta-feira' },
                              { value: '5', label: 'Sexta-feira' },
                              { value: '6', label: 'Sábado' }
                            ]}
                            sort
                          />

                          <View style={[styles.lastInputContainer,
                            styles.inputContainerSchedule
                          ]}>
                            <View style={styles.inputFrom}>
                              <Input
                                label="Das"
                                keyboardType="numeric"
                                labelError=""
                                error={false}
                                value={scheduleItem.from}
                                onChangeText={(newValue) => addValueInTime(index, 'from', newValue)}
                                maxLength={5}
                              />
                            </View>

                            <View style={styles.inputTo}>
                              <Input
                                label="Até" 
                                keyboardType="numeric"
                                labelError=""
                                error={false}
                                value={scheduleItem.to}
                                onChangeText={(newValue) => addValueInTime(index, 'to', newValue)}
                                maxLength={5}
                              />
                            </View>
                          </View>


                        </View>
                        { scheduleItems.length > 1 && (
                          <View style={styles.removeScheduleItemContainer}>
                            <View style={styles.removeScheduleItemRowContainer}>
                              <View style={styles.removeScheduleItemRow}></View>
                            </View>
                            <View style={styles.buttonRemoveContainer}>
                              <RectButton onPress={() => removeScheduleItem(index)}>
                                <Text style={styles.buttonRemoveScheduleItemText}>
                                  Excluir horário
                                </Text>
                              </RectButton>
                            </View>
                            <View style={styles.removeScheduleItemRowContainer}>
                              <View style={styles.removeScheduleItemRow}></View>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>

                <View style={styles.footer}>
                  <RectButton style={styles.buttonSave} 
                    onPress={handleSubmitProfile}
                  >
                    <Text style={styles.buttonSaveText}>
                      Salvar cadastro
                    </Text>
                  </RectButton>
                </View>
              </View>
            </View>
          </ScrollView> 
        ) : (
          <Success 
            title="Cadastro salvo!"
            description="Tudo certo, seu cadastro está na nossa lista de professores.
            Agora é só ficar de olho no seu WhatsApp."
            textButton="Voltar para a home"
            routeButton="Landing"
          />
        )
      }
    </>
  );
}

export default Profile;
