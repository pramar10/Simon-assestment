import { View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
const Header = () => {
  return (
    <View>
      <View>
        <Text style={{ fontSize: 30 }}>Device Name</Text>
        <Text style={{ color: 'green' }}>Connected</Text>
      </View>
      {/* <Icon name={'menu'} /> */}
    </View>
  );
};

export default Header;
