import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function Public() {

  console.log("Public Layout");
  
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="form" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}