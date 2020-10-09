import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { RectButton, TouchableOpacity  } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import { hasTokenValid, TOKEN_KEY } from '../../services/auth';
import useForm from '../../hooks/useForm';

import Proffy from '../../components/Proffy';
import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';

import checkIcon from '../../assets/images/icons/check.png';

import styles from './styles';

function Login() {

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

  useFocusEffect(
    React.useCallback(() => {
      hasTokenValid()
        .then((response) => {
          if (response) navigate('Landing');
        });
    }, [])
  );

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

        navigate('Landing');
      })
      .catch(({ response }) => {
        const data = response.data;
        const messageError = data.error ? data.error 
          : 'Ocorreu um erro inesperado!';
          
        console.log(messageError);
      });
  }

  return (
    <ScrollView style={styles.container}>
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
              required={true}
            />

            <InputPasword
              label="Senha"
              value={form.password}
              onChangeText={(newValue) => updateField('password', newValue)}   
              labelError="Senha não informada"
              error={errors.password}
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
