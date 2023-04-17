import React, {FunctionComponent} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import useWebSocketConn from './src/arduino/useWebSocketConn';

const App: FunctionComponent = () => {
  const {fontScale, scale} = useWindowDimensions();
  console.log(scale, fontScale);
  const {conStatus, data, transmit} = useWebSocketConn();

  return (
    <View style={styles.root}>
      <Text>Home Page</Text>
      <Text>data: {data}</Text>
      <Text>status: {conStatus ? 'Connected' : 'Disconnected'}</Text>
      <Button title="send" onPress={() => transmit('hello')} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
export default App;
