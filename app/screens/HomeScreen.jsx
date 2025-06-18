import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import CustomCircle from '../components/CustomCircle/CustomCircle';
import CustomSlider from '../components/CustomSlider/CustomSlider';
import Header from '../components/Header/Header';
import TestCustomButton from '../components/TestCustomButton/TestCustomButton';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              setRefreshing(false);
            }, 200);
          }}
        />
      }
    >
      <Header />
      <View style={{ flex: 0.8, justifyContent: 'center' }}>
        <TestCustomButton refreshing={refreshing} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
export default HomeScreen;
