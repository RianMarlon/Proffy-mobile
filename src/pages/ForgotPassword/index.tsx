import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { RectButton, TouchableOpacity  } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import api from '../../services/api';
import useForm from '../../hooks/useForm';

import Proffy from '../../components/Proffy';
import Success from '../../components/Success';
import InputLabel from '../../components/InputLabel';

import backGreyIcon from '../../assets/images/icons/back-grey.png';

import styles from './styles';

function ForgotPassword() {

  const { navigate } = useNavigation();
  
  const initialFields = {
    email: ''
  }
  
  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty
  ] = useForm(initialFields);

  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const [isSuccess, setIsSuccess] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisibility, setToastVisibility] = useState(false);
  const [toastBackgroundColor, setToastBackgroundColor] = useState('#07BC0C');

  useEffect(() => {
    const hasValidEmail = regexValidateEmail.test(form.email);

    if (hasValidEmail) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }
    
    // eslint-disable-next-line
  }, [form]);

  function navigateLogin() {
    navigate('Login');
  }

  function handleSubmitForgotPassword() {
    validateFields();

    if (hasOneFieldEmpty()) {
      return;
    }

    const data = {
      email: form.email
    };

    api.post('/forgot-password', data)
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
              <Proffy />
            </View>
            <View style={styles.main}>
              <View style={styles.mainContainer}>
                <View style={styles.buttonBackContainer}>
                  <TouchableOpacity onPress={navigateLogin}>
                    <Image source={backGreyIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      Esqueceu sua senha?
                    </Text>
                    <Text style={styles.description}>
                      Não esquenta,
                      {'\n'}
                      vamos dar um jeito nisso.
                    </Text>
                  </View>

                  <View>
                    <InputLabel
                      label="E-mail"
                      value={form.email}
                      onChangeText={(newValue) => updateField('email', newValue)}
                      labelError="E-mail não informado"
                      error={errors.email}
                      required={true}
                    />

                    {
                      buttonSubmitDisabled ? (
                        <TouchableOpacity
                          style={[
                            styles.buttonForgotPassword, styles.buttonForgotPasswordDisabled
                          ]}
                          disabled={buttonSubmitDisabled}
                        >
                          <Text style={[
                            styles.buttonForgotPasswordText, 
                            styles.buttonForgotPasswordTextDisabled
                          ]}>
                            Entrar
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <RectButton
                          onPress={handleSubmitForgotPassword}
                          style={styles.buttonForgotPassword}
                        >
                          <Text style={styles.buttonForgotPasswordText}>
                            Enviar
                          </Text>
                        </RectButton>
                      )
                    }
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <Success 
            title="Redefinição enviada!"
            description="Boa, agora é só checar o e-mail que foi enviado para você
            redefinir sua senha e aproveitar os estudos."
            textButton="Voltar ao login"
            routeButton="Login"
          />
        )
      }
    </>
  );
}

export default ForgotPassword;
