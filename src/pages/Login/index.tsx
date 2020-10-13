import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { RectButton, TouchableOpacity  } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';

import api from '../../services/api';
import { TOKEN_KEY } from '../../services/auth';

import AuthContext from '../../contexts/AuthContext';

import useForm from '../../hooks/useForm';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';

import checkIcon from '../../assets/images/icons/check.png';

import styles from './styles';

function Login() {

  const { checkToken } = useContext(AuthContext);
  const { navigate } = useNavigation();

  const initialFields = {
    email: '',
    password: ''
  }

  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty, resetFields
  ] = useForm(initialFields);

  const [rememberMe, setRememberMe] = useState(false);
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisibility, setToastVisibility] = useState(false);
  const [toastBackgroundColor, setToastBackgroundColor] = useState('#07BC0C');

  useEffect(() => {
    const hasValidEmail = regexValidateEmail.test(form.email);

    if (hasValidEmail && !hasOneFieldEmpty()) {
      setButtonSubmitDisabled(false);
    }

    else {
      setButtonSubmitDisabled(true);
    }

    // eslint-disable-next-line
  }, [form]);

  function navigateRegister() {
    navigate('Register');
  }

  function navigateForgotPassword() {
    navigate('ForgotPassword');
  }

  function handleSubmitLogin() {
    validateFields();

    if (hasOneFieldEmpty()) {
      return;
    }

    const data = {
      email: form.email,
      password: form.password,
      remember_me: rememberMe
    }

    api.post('/signin', data)
      .then((response) => {
        resetFields();

        const { token } = response.data;

        AsyncStorage.setItem(TOKEN_KEY, token);
        checkToken();
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Fazer Login
            </Text>
            <TouchableOpacity onPress={navigateRegister}>
              <Text style={styles.buttonCreateAccountText}>
                Criar uma conta
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <InputLabel
              label="E-mail"
              value={form.email}
              onChangeText={(newValue) => updateField('email', newValue)}
              labelError="E-mail não informado"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              required={true}
            />

            <InputPasword
              label="Senha"
              value={form.password}
              onChangeText={(newValue) => updateField('password', newValue)}   
              labelError="Senha não informada"
              error={errors.password}
              autoCapitalize="none"
              required={true}
            />

            <View style={styles.extraContainer}>
              <TouchableOpacity
                style={styles.buttonCheck}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={rememberMe
                  ? [styles.checkContainer, styles.checkYesContainer]
                  : [styles.checkContainer, styles.checkNoContainer]
                }>
                  {
                    rememberMe && (
                      <ImageBackground
                        source={checkIcon}
                        resizeMode="center"
                        style={styles.checkBackgroundImage}
                      >
                        
                      </ImageBackground>
                    )
                  }
                </View>
                <View></View>
                <Text style={styles.rememberMeText}>
                  Lembrar-me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={navigateForgotPassword}
              >
                <Text style={styles.buttonForgotPasswordText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
            </View>

            {
              buttonSubmitDisabled ? (
                <TouchableOpacity
                  style={[
                    styles.buttonLogin, styles.buttonLoginDisabled
                  ]}
                  disabled={buttonSubmitDisabled}
                >
                  <Text style={[
                    styles.buttonLoginText, 
                    styles.buttonLoginTextDisabled
                  ]}>
                    Entrar
                  </Text>
                </TouchableOpacity>
              ) : (
                <RectButton
                  onPress={handleSubmitLogin}
                  style={styles.buttonLogin}
                >
                  <Text style={styles.buttonLoginText}>
                    Entrar
                  </Text>
                </RectButton>
              )
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Login;
