import { StyleSheet, Image, Platform, Button, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ToastAndroid,} from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import ThemedBackground from '@/components/ThemedBackground';

import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';



export default function Payment() {
  const [amount, setAmount] = useState<number|null>(null);
  const [transactionDesc, setTransactionDesc] = useState<string>('');
  const [permission, requestPermission] = useCameraPermissions();


  

  if (!permission) {
    // Camera permissions are still loading.
    return <ThemedBackground />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedBackground>
        <ThemedText style={styles.text}>We need your permission to show the camera</ThemedText>
        <Button onPress={requestPermission} title="grant permission" />
      </ThemedBackground>
    );
  }

  async function handleDeepLink() {
    if(!permission?.granted) {
      ToastAndroid.show('Please grant camera permission', ToastAndroid.SHORT);
      return;
    }
    if (!amount) {
      ToastAndroid.show('Please enter the amount', ToastAndroid.SHORT);
      return;
    }
    if (!transactionDesc) {
      ToastAndroid.show('Please enter the transaction description', ToastAndroid.SHORT);
      return;
    }
    router.push({ pathname: "/scanner", params: { amount:amount, transactionDesc: transactionDesc }})
    setAmount(null);
    setTransactionDesc('');
  }
  

  return (
    <KeyboardAvoidingView>
      <ThemedBackground style={{padding:10}}>
        <View style={styles.container}>

          <ThemedText style={styles.text}>Payment through QR Code</ThemedText>
          <View>
            <ThemedText style={styles.label}>Enter the Amount:</ThemedText>
            <TextInput 
              value={amount?.toString()}
              onChangeText={(value) => {setAmount(parseFloat(value))}}
              keyboardType='decimal-pad'
              placeholder='Amount'
              style={styles.textInput}
              />
          </View>
          <View>
            <ThemedText style={styles.label}>Enter the Description:</ThemedText>
            <TextInput
              value={transactionDesc}
              onChangeText={(value) => {setTransactionDesc(value)}}
              placeholder='Transaction Description'
              keyboardType='default'
              style={styles.textInput}
              />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleDeepLink}
          >
            <ThemedText>PAY</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10,
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
  },
  label: {
    margin:0,
    padding:0,
    fontSize: 12,
    // textAlign: 'center',
    // paddingBottom: 10,
  },
  button: {
    backgroundColor: '#319A36',
    padding: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
  }
});
