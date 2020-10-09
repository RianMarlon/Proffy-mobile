import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { RectButton, TouchableOpacity  } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import useForm from '../../hooks/useForm';

import Success from '../../components/Success';
import InputLabel from '../../components/InputLabel';
import InputPasword from '../../components/InputPassword';

import backGreyIcon from '../../assets/images/icons/back-grey.png';

import styles from './styles';
import { hasTokenValid } from '../../services/auth';

function Register() {

  const { navigate } = useNavigation();
  
  const initialFields = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty, resetFields
  ] = useForm(initialFields);

  const [page, setPage] = useState(1);

  const [labelTextError, setLabelTextError] = useState('Senha não informada');
  const [differentPasswords, setDifferentPasswords] = useState(false);
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);
  const regexValidateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const [isSuccess, setIsSuccess] = useState(false);

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

    if (page == 1) {
      if (!form.firstName.trim() || !form.lastName.trim()) {
        setButtonSubmitDisabled(true);
      }

      else {
        setButtonSubmitDisabled(false);
      }
    }

    else if (page == 2) {
      if (hasValidEmail && form.password.length >= 6 
          && form.confirmPassword.length >= 6) {
          setButtonSubmitDisabled(false);
      }
  
      else {
        setButtonSubmitDisabled(true);
      }
    }

    // eslint-disable-next-line
  }, [form, page]);

  useEffect(() => {
    setDifferentPasswords(false);
  }, [form.confirmPassword]);

  function navigateBack() {
    if (page == 1) {
      navigate('Login');
    }

    else {
      setPage(page - 1);
    }
  }

  function handleSubmitLastPage() {
    setPage(page + 1);
  }

  function handleSubmitRegister() {
    validateFields();

    if (form.password !== form.confirmPassword) {
      setDifferentPasswords(true);
      setLabelTextError('Senhas não conferem');
    }

    if (hasOneFieldEmpty() || differentPasswords) {
      return;
    }

    const data = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
      confirm_password: form.confirmPassword
    }

    api.post('/signup', data)
      .then(() => {
        resetFields();
        setIsSuccess(true);
      })
      .catch(({ response }) => {
        const data = response.data;
        const messageError = data.error ? data.error 
          : 'Ocorreu um erro inesperado!';
          
        console.log(messageError);
      });
  }

  return (
    <>
      {
        !isSuccess ? (
          <ScrollView style={styles.container}>
            <View style={styles.main}>
              <View style={styles.mainContainer}>
                <View style={styles.buttonBackContainer}>
                  <TouchableOpacity onPress={navigateBack}>
                    <Image source={backGreyIcon} />
                  </TouchableOpacity>

                  <View style={styles.ellipseContainer}>
                    <View
                      style={page == 1 
                        ? [styles.ellipse, styles.ellipseActivated]
                        : [styles.ellipse]
                      }
                    />
                    <View 
                      style={page == 2
                        ? [styles.ellipse, styles.ellipseActivated]
                        : [styles.ellipse]
                      }
                    />
                  </View>
                </View>

                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    Crie sua conta gratuita
                  </Text>

                  <Text style={styles.description}>
                    Basta preencher esses dados e você estará conosco.
                  </Text>
                </View>

                {
                  page == 1 && (
                    <View style={styles.formContainer}>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionPage}>
                          01. Quem é você?
                        </Text>
                      </View>

                      <View>
                        <InputLabel
                          label="Nome"
                          value={form.firstName}
                          onChangeText={(newValue) => updateField('firstName', newValue)}
                          labelError="Nome não informado"
                          error={errors.firstName}
                          required={true}
                        />

                        <InputLabel
                          label="Sobrenome"
                          value={form.lastName}
                          onChangeText={(newValue) => updateField('lastName', newValue)}
                          labelError="Sobrenome não informado"
                          error={errors.lastName}
                          required={true}
                        />

                        {
                          buttonSubmitDisabled ? (
                            <TouchableOpacity
                              style={[
                                styles.button,
                                styles.buttonDisabled
                              ]}
                              disabled={buttonSubmitDisabled}
                            >
                              <Text style={[
                                styles.buttonText,
                                styles.buttonTextDisabled
                              ]}>
                                Próximo
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <RectButton
                              onPress={handleSubmitLastPage}
                              style={[
                                styles.button,
                                styles.buttonLast
                              ]}
                            >
                              <Text style={styles.buttonText}>
                                Próximo
                              </Text>
                            </RectButton>
                          )
                        }
                      </View>
                    </View>
                  )
                }

                {
                  page == 2 && (
                    <View style={styles.formContainer}>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionPage}>
                          02. Email e Senha
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

                        <InputPasword
                          label="Senha"
                          value={form.password}
                          onChangeText={(newValue) => updateField('password', newValue)}
                          labelError="Senha não informada"
                          error={errors.password}
                          required={true}
                        />

                        <InputPasword
                          label="Confirmar senha"
                          value={form.confirmPassword}
                          onChangeText={(newValue) => updateField('confirmPassword', newValue)}
                          labelError={labelTextError}
                          error={errors.confirmPassword || differentPasswords}
                          required={true}
                        />

                        {
                          buttonSubmitDisabled ? (
                            <TouchableOpacity
                            style={[
                              styles.button,
                              styles.buttonDisabled
                            ]}
                              disabled={buttonSubmitDisabled}
                            >
                              <Text style={[
                                styles.buttonText, 
                                styles.buttonTextDisabled
                              ]}>
                                Enviar
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <RectButton
                              onPress={handleSubmitRegister}
                              style={[
                                styles.button,
                                styles.buttonRegister
                              ]}
                            >
                              <Text style={styles.buttonText}>
                                Enviar
                              </Text>
                            </RectButton>
                          )
                        }
                      </View>
                    </View>
                  )
                }

              </View>
            </View>
          </ScrollView>
        ) : (
          <Success 
            title="Cadastro concluído!"
            description="Agora você faz parte da
            plataforma da Proffy"
            textButton="Voltar ao login"
            routeButton="Login"
          />
        )
      }
    </>
  );
}

export default Register;
