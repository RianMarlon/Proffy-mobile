import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import styles from './styles';

export interface TextareaProps extends TextInputProps {
  label: string,
  required?: boolean,
  note?: string,
  labelError?: string,
  error?: boolean,
}

const Textarea: React.FC<TextareaProps> = ({
    label, required, note, labelError, error, ...rest
  }) => {

  const [hasFocus, setHasFocus] = useState(false);

  function onFocus() {
    setHasFocus(true);
  }

  function onBlur() {
    setHasFocus(false);
  }

  return (
    <View style={styles.container}>
      <Text style={error && required ? [styles.label, styles.error] : styles.label }>
        {error && required ? labelError : label}
        {' '}
        <Text style={styles.note}>
          { !error && note && `(${note})` }
        </Text>
      </Text>
      <View>
        <TextInput
          style={styles.textarea}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={true}
          numberOfLines={10}
          { ...rest }
        />
        <View style={hasFocus ? styles.textareaContainerFocus : []}></View>
      </View>
    </View>
  );
}

export default Textarea;
