import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const CustomSlider = () => {
  return (
    <View style={{ marginTop: 80 }}>
      <View style={styles.sliderView}>
        <Text style={{ position: 'absolute', top: -30 }}>Intensity</Text>
        <View style={styles.thumb}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderView: {
    width: '100%',
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 30,
  },
  thumb: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 1,
  },
});

export default CustomSlider;
