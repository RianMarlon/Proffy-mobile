import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import styles from './styles';

interface InputProps extends TextInputProps {
  label: string,
  labelColor?: string,
  required?: boolean,
  note?: string,
  textLeftInput?: string,
  labelError?: string,
  error?: boolean,
}

const Input: React.FC<InputProps> = ({
    label, labelColor='#9C98A6', required, note, textLeftInput, labelError, error, ...rest
  }) => {

  const styleLabel = StyleSheet.create({
    color: {
      color: labelColor,
    }
  });

  const [hasFocus, setHasFocus] = useState(false);

  function onFocus() {
    setHasFocus(true);
  }

  function onBlur() {
    setHasFocus(false);
  }

  return (
    <View style={styles.container}>
      <Text style={error && required 
        ? [styles.label, styles.error] 
        : [styles.label, styleLabel.color] 
      }>
        {error && required ? labelError : label}
        {' '}
        <Text style={styles.note}>
          { !error && note && `(${note})` }
        </Text>
      </Text>
      <View>
        <TextInput
          style={ textLeftInput
            ? [styles.input, styles.hasTextLeft]
            : styles.input
          }
          onFocus={onFocus}
          onBlur={onBlur}
          { ...rest }
        />
        <View style={hasFocus ? styles.inputContainerFocus : []}></View>
        {
          textLeftInput && (
            <Text style={styles.textLeft}>{ textLeftInput }</Text>
          )
        }
      </View>
    </View>
  );
}

export default Input;
