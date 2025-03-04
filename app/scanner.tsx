import { StyleSheet, Image, Platform, Button, TouchableOpacity, View, ImageBackground } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import ThemedBackground from '@/components/ThemedBackground';

import * as Linking from 'expo-linking';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/config/supabase';
import { useAuth } from '@/context/auth';


export default function Scanner() {
  const {session} = useAuth();
  const { amount, transactionDesc }: {amount:string, transactionDesc:string} = useLocalSearchParams();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <ThemedBackground />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedBackground>
        <ThemedText style={styles.message}>We need your permission to show the camera</ThemedText>
        <Button onPress={requestPermission} title="grant permission" />
      </ThemedBackground>
    );
  }
  

  return (
      <View style={styles.container}>
      <CameraView 
        flash='on'
        // ratio='16:9'
        style={styles.camera} 
        facing={facing} 
        barcodeScannerSettings={{barcodeTypes: ["qr"]}}
        onBarcodeScanned={(data) => {
          // console.log(data);
          
          setTimeout(async() => {
            if(!data.data.startsWith("upi://")) {
              return;
            }
            await Linking.openURL(data.data + `&am=${amount}&cu=INR&tn=${encodeURI(transactionDesc)}`);
            if (!session?.user?.id) {
              console.error("User ID is missing");
              return;
            }
            const {data:res} = await supabase.from('profiles')
              .update({ payment_history: session?.user.user_metadata.payment_history + parseInt(amount) })
              .eq('id', session?.user.id)
              .select("*")
              .single();
            console.log(res);
            
          },500);
        }}>
      </CameraView>
      <Image source={require("@/assets/images/overlay_2.png")} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex:100}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
