import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const CustomCircle = ({ percentage, disableHandler, isDisabled }) => {
  const renderValue = val => {
    if (val < 40) return 'Intensity';
    else return 'Intensidad';
  };

  const size = useSharedValue(100);
  const fontSize = useSharedValue(40);
  useEffect(() => {
    const newSize = 100 + (percentage / 100) * 190;
    const newFontSize = 40 + (percentage / 100) * 20;
    size.value = withTiming(newSize, { duration: 300 });
    fontSize.value = withTiming(newFontSize, { duration: 300 });
  }, [percentage]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    fontSize: fontSize.value,
  }));
  return (
    <Pressable
      style={{
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      onPress={disableHandler}
    >
      <Text
        style={{
          position: 'absolute',
          bottom: -50,
          left: -10,
          fontSize: 12,
          color: '#2B2A2A',
        }}
      >
        {renderValue(percentage)}
      </Text>

      <View
        style={{
          backgroundColor: '#eee',
          height: 300,
          width: 300,
          borderRadius: 150,
          elevation: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: isDisabled
                ? '#CFC9C9'
                : percentage > 40
                ? '#FFDD6D'
                : '#FFEEA9',
              elevation: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
            animatedStyle,
          ]}
        >
          <Animated.Text style={[{ color: '#000' }, animatedTextStyle]}>
            {percentage}%
          </Animated.Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default CustomCircle;
