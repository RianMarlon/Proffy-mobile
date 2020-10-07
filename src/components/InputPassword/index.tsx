import React, { useState, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import InputLabel from '../InputLabel';

import showIcon from '../../assets/images/icons/show.png';
import doNotShowIcon from '../../assets/images/icons/do-not-show.png';

import styles from './styles';

interface InputPasswordProps extends TextInputProps {
  label: string,
  labelColor?: string,
  labelError?: string,
  error?: boolean,
  required?: boolean,
}

const InputPasword: React.FC<InputPasswordProps> = ({
    label, labelError, error, value, onChangeText, required 
  }) => {

  const [isInputText, setIsInputText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if(showPassword) {
      setIsInputText(true);
    }

    else {
      setIsInputText(false);
    }
  }, [showPassword]);

  return (
    <View>
      <InputLabel 
        label={label} 
        labelError={labelError} 
        error={error}
        value={value} 
        onChangeText={onChangeText} 
        required={required}
        buttonRight={
          <TouchableOpacity style={styles.buttonShowPassword}
            onPress={() => setShowPassword(!showPassword)
          }>
            { showPassword 
              ? <Image source={doNotShowIcon} width={24} height={24} />
              : <Image source={showIcon} width={24} height={24} />
            }
          </TouchableOpacity>
        }
        secureTextEntry={!isInputText}
      />
    </View>
  );
}

export default InputPasword;
