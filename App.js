import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HeadlineList from './components/HeadLinesList';

export default function App() {
  return (
    <View style={styles.container}>
      <HeadlineList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
