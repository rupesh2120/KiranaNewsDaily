import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LoaderBanner = () => {

  return (
    <View style={styles.container}>
      <Image source={require('../images/loader.png')} resizeMode='contain' style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 500,
  },
});

export default LoaderBanner;
