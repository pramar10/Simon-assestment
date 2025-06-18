import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomCircle from '../CustomCircle/CustomCircle';

const SLIDER_WIDTH = Dimensions.get('screen').width - 50;
const THUMB_SIZE = 50;

const TestCustomButton = ({ refreshing }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const offset = useSharedValue(0);

  const gestureEnabledSV = useSharedValue(isDisabled);

  useEffect(() => {
    if (refreshing) {
      setPercentage(0);
      offset.value = withTiming(0, { duration: 300 });
    }
  }, [refreshing]);
  useEffect(() => {
    gestureEnabledSV.value = isDisabled;
  }, [isDisabled]);
  const disableHandler = () => {
    setIsDisabled(!isDisabled);
  };

  const derivedPercentage = useDerivedValue(() => {
    return Math.round((offset?.value / (SLIDER_WIDTH - THUMB_SIZE)) * 100);
  });

  useAnimatedReaction(
    () => derivedPercentage.value,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        runOnJS(setPercentage)(newVal);
      }
    },
    [],
  );

  const pan = Gesture.Pan().onChange(event => {
    if (gestureEnabledSV.value) return;
    const nextOffset = offset.value + event.changeX;
    offset.value = Math.min(Math.max(nextOffset, 0), SLIDER_WIDTH - THUMB_SIZE);
  });

  const sliderHandleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const leftTrackStyle = useAnimatedStyle(() => ({
    width: offset.value + THUMB_SIZE / 2,
  }));

  const rightTrackStyle = useAnimatedStyle(() => ({
    left: offset.value + THUMB_SIZE / 2,
    width: SLIDER_WIDTH - (offset.value + THUMB_SIZE / 2),
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomCircle
        percentage={percentage}
        disableHandler={disableHandler}
        isDisabled={isDisabled}
      />

      <View style={styles.sliderWrapper}>
        <Animated.View
          style={[
            styles.sliderLeft,
            { backgroundColor: isDisabled ? '#CFC9C9' : '#FFDD6D' },
            leftTrackStyle,
          ]}
        />
        <Animated.View style={[styles.sliderRight, rightTrackStyle]} />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sliderHandle, sliderHandleStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    marginTop: 50,
  },
  sliderWrapper: {
    width: SLIDER_WIDTH,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 40,
  },
  sliderLeft: {
    position: 'absolute',
    left: 0,
    height: '100%',
    zIndex: 0,
  },
  sliderRight: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#f1f1f1', // light gray
    zIndex: 0,
  },
  sliderHandle: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: '#f8f9ff',
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#C3C3C3',
  },
});

export default TestCustomButton;
