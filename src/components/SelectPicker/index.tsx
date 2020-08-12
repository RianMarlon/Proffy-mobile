import React  from 'react';
import { Picker } from '@react-native-community/picker';
import { Text, PickerProperties, View } from 'react-native';

import styles from './styles';

interface PickerProps extends PickerProperties  {
  label: string,
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

const SelectPicker: React.FC<PickerProps> = ({ label, items, sort, style, ...rest }) => {

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
      <Text style={styles.label}>{label}</Text>
      <View style={styles.picker} {...style}>
        <Picker
          selectedValue=""
          {...rest}
        >
          <Picker.Item 
            label="Selecione uma opção..."
            value=""
          />

          {items.map((item: ItemProps) => {
            return (
              <Picker.Item
                key={item.value} 
                label={item.label}
                value={item.value} 
              />
            )
          })}
        </Picker>
      </View>
    </>
  );
}

export default SelectPicker;
