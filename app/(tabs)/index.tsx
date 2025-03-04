import { Image, StyleSheet, Platform, Text, Button, TouchableOpacity, View, TextInput, ToastAndroid, } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ThemedBackground from "@/components/ThemedBackground";
import { HelloWave } from "@/components/HelloWave";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as LocalAuthentication from 'expo-local-authentication';
import LottieView from "lottie-react-native";
import Header from "@/components/Header";
import Spacer from "@/components/Spacer";
import { AuthProvider, useAuth } from "@/context/auth";
import { supabase } from "@/config/supabase";


export default function HomeScreen() {
  const [amount, setAmount] = useState<number | null>(null);
  const [transactionDesc, setTransactionDesc] = useState<string>("");

  const { session } = useAuth();

  function handlePress() {
    router.push("/chat");
  }

  const handleBiometricAuth = async () => {
    const isBioAuthAvailable = await LocalAuthentication.hasHardwareAsync();
    if (!isBioAuthAvailable) {
      ToastAndroid.show("Biometric Authentication is not available on this device.",ToastAndroid.SHORT);
      return;
    }

    let supportedBiometrics;
    if(isBioAuthAvailable) {
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
    }
    LocalAuthentication.authenticateAsync({
      promptMessage:"Authenticate to proceed", 
      biometricsSecurityLevel:"strong",
      // cancelLabel:"Cancel",
      disableDeviceFallback:true,
      fallbackLabel:"Use App Passcode",
    })
    .then((res) => {
      if(!res.success) {
        handleBiometricAuth();
      } else {
        ToastAndroid.show("Authentication Successful",ToastAndroid.SHORT);
      }
    })
  }


  // DON'T USE THIS IN DEVELOPMENT MODE
  // useEffect(()=> {
  //   handleBiometricAuth();
  // },[])

  async function addTransaction() {
    const {data:res} = await supabase.from('profiles')
      .update({ payment_history: session?.user.user_metadata.payment_history + amount })
      .eq('id', session?.user.id)
      .select("*")
      .single();
      console.log(res);

  
    const {data:transaction} = await supabase.from('transactions')
      .insert({ amount: amount, description: transactionDesc, user_id: session?.user.id })
      .single();
    console.log(transaction);
    setAmount(null);
    setTransactionDesc('');
  }


  return (
    <ThemedBackground style={{ padding: 20, paddingTop:70 }}>
      <AuthProvider>

        <Header/>
        <StatusBar backgroundColor="black"/>
        <View style={{ gap: 8, marginBottom: 8 }}>
          <ThemedText style={styles.text}>
            Welcome <HelloWave /> <ThemedText style={styles.colorText}>{session?.user.user_metadata.name}</ThemedText>
          </ThemedText>
        </View>

        <Spacer margin={8}/>

        <View style={styles.container}>
          <ThemedText style={styles.text}>Add a Transaction</ThemedText>
          <ThemedText style={{ margin: 0, fontSize: 14, padding: 0 }}>
            You can add an externally handled transaction here.
          </ThemedText>
          <View>
            <ThemedText style={styles.label}>Enter the Amount:</ThemedText>
            <TextInput
              value={amount?.toString()}
              onChangeText={(value) => {
                setAmount(parseFloat(value));
              }}
              keyboardType="decimal-pad"
              placeholder="Amount"
              style={styles.textInput}
            />
          </View>
          <View>
            <ThemedText style={styles.label}>Enter the Description:</ThemedText>
            <TextInput
              value={transactionDesc}
              onChangeText={(value) => {
                setTransactionDesc(value);
              }}
              placeholder="Transaction Description"
              keyboardType="default"
              style={styles.textInput}
            />
          </View>
          <Spacer margin={4}/>
          <TouchableOpacity style={styles.button} onPress={addTransaction}>
            <ThemedText>PAY</ThemedText>
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.chatIcon} onPress={handlePress}>
          <LottieView
            loop
            autoPlay
            source={require('@/assets/animations/robot.json')}
            style={{width: 50, height: 50}}
          />
          
        </TouchableOpacity>
      </AuthProvider>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    display: "flex",
    gap: 8,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: "100%",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  arrow: {
    height: 363.84,
    width: 327.12,
    left: 0,
    bottom: 0,
    position: "absolute",
    zIndex: 0,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    zIndex: 1,
  },
  colorText: {
    fontWeight: "bold",
    color: "#319A36",
    fontSize: 22,
    zIndex: 1,
  },
  button: {
    backgroundColor: "#319A36",
    padding: 4,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 6,
  },
  label: {
    margin: 0,
    padding: 0,
    fontSize: 12,
  },
  chatIcon: {
    padding:10,
    backgroundColor: "#333",
    borderRadius: 50,
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 1,
  }
});
