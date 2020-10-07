import React from 'react';
import { Picker } from '@react-native-community/picker';
import { Text, PickerProps, View, StyleSheet } from 'react-native';

import styles from './styles';

interface PickerProperties extends PickerProps  {
  label: string,
  labelColor?: string,
  required?: boolean,
  labelError?: string,
  error?: boolean,
  items: Array<{
    value: string,
    label: string
  }>,
  sort?: boolean
}

interface ItemProps {
  value: string,
  label: string
}

const SelectPicker: React.FC<PickerProperties> = ({
    label, labelColor='#9C98A6', required, labelError,
    error, items, sort, ...rest 
  }) => {

  const styleLabel = StyleSheet.create({
    color: {
      color: labelColor,
    }
  });

  if (sort) {
    const functionComparation = (a: ItemProps, b: ItemProps) => {
      if (a.value > b.value) {
        return 1;
      }
  
      else if (a.value < b.value) {
        return -1;
      }
  
      else {
        return 0;
      }
    }
  
    items.sort(functionComparation);
  }
  
  return (
    <>
      <Text style={error && required 
        ? [styles.label, styles.error] 
        : [styles.label, styleLabel.color] 
      }>
        {error && required ? labelError : label}
      </Text>
      <View style={styles.picker}>
        <Picker
          selectedValue=""
          itemStyle={styles.itemPicker}
          {...rest}
        >
          <Picker.Item 
            label="Selecione..."
            value=""
            color="#6A6180"
          />

          {items.map((item: ItemProps) => {
            return (
              <Picker.Item
                key={item.value} 
                label={item.label}
                value={item.value}
                color="#6A6180"
              />
            )
          })}
        </Picker>
      </View>
    </>
  );
}

export default SelectPicker;
