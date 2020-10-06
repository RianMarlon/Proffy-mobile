import React, { useState, ReactNode, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import styles from './styles';

interface InputLabelProps extends TextInputProps {
  label: string,
  labelColor?: string,
  labelError?: string,
  error?: boolean,
  required?: boolean,
  buttonRight?: ReactNode
}

const InputLabel: React.FC<InputLabelProps> = ({ 
    label, labelError, error, value, onChangeText, required, buttonRight, ...rest 
  }) => {

  const [stylesTextInput, setStylesTextInput] = useState<any>([]);
  const [stylesLabel, setStylesLabel] = useState<any>([]);

  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (buttonRight) {
      if (hasFocus || value && value.toString()) {
        setStylesTextInput([
          styles.input, styles.inputFocus, styles.hasButtonRight
        ]);
      }

      else {
        setStylesTextInput([
          styles.input, styles.hasButtonRight
        ]);
      }
    }

    else {
      if (hasFocus || value && value.toString()) {
        setStylesTextInput([
          styles.input, styles.inputFocus
        ]);
      }

      else {
        setStylesTextInput([
          styles.input
        ]);
      }
    }

  }, [hasFocus]);

  useEffect(() => {
    if (error && required) {
      if (hasFocus || value && value.toString()) {
        setStylesLabel([
          styles.label, styles.error, styles.labelFocus
        ]);
      }

      else {
        setStylesLabel([
          styles.label, styles.error
        ]);
      }
    }

    else {
      if (hasFocus || value && value.toString()) {
        setStylesLabel([
          styles.label, styles.labelFocus
        ]);
      }

      else {
        setStylesLabel([
          styles.label
        ]);
      }
    }

  }, [hasFocus, error]);

  function onFocus() {
    setHasFocus(true);
  }

  function onBlur() {
    setHasFocus(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={stylesTextInput}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value} 
        onChangeText={onChangeText}
        {...rest}
      />
      <View style={hasFocus ? styles.inputContainerFocus : []}></View>
      <Text style={stylesLabel}>
        {error && required ? labelError : label}
      </Text>
      { buttonRight && (
        <View style={styles.buttonRight}>
          {buttonRight}
        </View>
      )}
    </View>
  );
}

export default InputLabel;
