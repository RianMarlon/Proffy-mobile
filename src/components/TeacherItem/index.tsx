import React from 'react';
import { View, Image, Text } from 'react-native';

function TeacherItem() {
  return (
    <View>
      <View>
        <Image 
          source={{ uri: 'https://github.com/RianMarlon.png' }}
        />

        <View>
          <Text>Rian Marlon</Text>
          <Text>Matemática</Text>
        </View>
      </View>

      <Text>
        Entuasiasta nas melhores técnicas de cálculos matemáticos do mundo.
        {'\n'}{'\n'}
        Considerado um dos melhores professores de Matemática do mundo, sendo reconhecido por vários cientistas como o Leonard Euler II.
      </Text>
    </View>
  );
}

export default TeacherItem;
