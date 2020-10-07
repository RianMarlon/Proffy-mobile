import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Navbar from '../Navbar';

interface PageHeaderProps {
  namePage: string
  title: string,
  description?: string,
  headerRight?: ReactNode,
}

const PageHeader: React.FC<PageHeaderProps> = ({
    namePage, title, description, headerRight, children
  }) => {

  return (
    <View style={styles.container}>
      <Navbar
        namePage={namePage}
      />

      <View style={styles.headerContent}>
        <View>
          <Text style={headerRight 
            ? styles.title 
            : [styles.title, styles.noHeaderRight]
          }>
            {title}
          </Text>
          {description && 
            <Text style={styles.description}>
              {description}
            </Text>
          }
        </View>
        { headerRight && (
          <View>
            { headerRight }
          </View>
        )}
      </View>
      <View style={styles.children}>
        {children}
      </View>
    </View>
  );
}

export default PageHeader;
