/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <HomeScreen />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: '800',
  },
});

export default App;
