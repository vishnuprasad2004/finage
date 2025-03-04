import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React from 'react'
import ThemedBackground from '@/components/ThemedBackground'
import { ThemedText } from '@/components/ThemedText'
import Feather from '@expo/vector-icons/Feather';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { ThemedView } from '@/components/ThemedView';
import Spacer from '@/components/Spacer';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import LottieView from 'lottie-react-native';
import { fetch } from "expo/fetch";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Links } from '@/constants/Links';

interface ChatProps {
  from: "user" | "bot";
  message: string;
  createdAt: Date;
}

const Chat = () => {
  const [started, setStarted] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userQuery, setUserQuery] = React.useState<string>('');
  const [chat, setChat] = React.useState<ChatProps[]>([
    {
      from: "bot",
      message: "Hello, I am your Financial AI Agent. How can I help you today?",
      createdAt: new Date(),
    }
  ]);

  const postQuery = async (query:string) => {
    try {
      console.log(JSON.stringify({ query }));
      const response = await fetch(Links.CHAT_BOT_CHAT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Error: ${data.response || "Unknown error"}`);
      }
      console.log(data);
      return { response: data.response, status: data.status };
    } catch (error) {
      console.error("Error:", error);
      return { response: "Server side Error, Please Try again some time later ... Thank you for your Patience", status: "error" };
    }
  };
  

  const handleSend = () => {
    setStarted(true);
    
    if (userQuery.trim() === '') {
      ToastAndroid.show("Please enter a valid query", ToastAndroid.SHORT);
      return;
    }
  
    setChat((prevChat) => [
      ...prevChat,
      { from: "user", message: userQuery, createdAt: new Date() }
    ]);
  
    console.log(chat); // Still logs old state due to async updates
    
    setLoading(true);
    postQuery(userQuery).then(({ response }) => {
      setChat((prevChat) => [
        ...prevChat,
        { from: "bot", message: response, createdAt: new Date() }
      ]);
    }).catch((error) => {
      setChat((prevChat) => [
        ...prevChat,
        { from: "bot", message: error, createdAt: new Date() }
      ]);
    }).finally(() => setLoading(false));

    setLoading(false);
  
    setUserQuery('');
  };
  

  return (
    <ThemedBackground style={styles.container}>
      <GestureHandlerRootView style={{padding:10}}>
        <ThemedView style={{display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: 8, borderRadius: 6, marginBottom: 8}}>
          <TouchableOpacity onPress={() => {router.back()}}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText style={styles.text}>Chat with our Finanical AI Agent</ThemedText>
        </ThemedView>

      <ScrollView>
        <Spacer margin={10}/>
        {chat.map((c, i) => (
          <View key={i} style={{padding: 8, borderRadius: 6, marginBottom: 8, display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 8, width: "90%"}}>
            {c.from === 'bot' ? <LottieView loop autoPlay source={require('@/assets/animations/robot.json')} style={{ width: 35, height: 35 }} /> : <FontAwesome6 name="user-large" size={24} color="white" /> }
            <ThemedText style={{fontWeight: c.from === 'user' ? "900" : "400"}}>{c.message}</ThemedText>
          </View>
        ))}
        {loading ? <ActivityIndicator size="large" color="#319A36" /> : <View></View>}
        <Spacer margin={10}/>
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {!started ? <LottieView loop autoPlay source={require('@/assets/animations/robot.json')} style={{ width: 100, height: 100, marginTop: 12 }} /> : <View></View>}
        </View>
        <Spacer margin={100}/>
      </ScrollView>

      </GestureHandlerRootView>
      <ThemedView style={styles.askContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder='Ask your Prompt'
          value={userQuery}
          onChangeText={setUserQuery}
          autoCorrect={true}
        />

        
        <TouchableOpacity style={{backgroundColor: '#319A36', padding: 8, borderRadius: 6}} onPress={handleSend}>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedBackground>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    // padding:15,
  },
  text: {
    fontWeight: 'bold',
    color: '#319A36',
    fontSize: 20,
  },
  askContainer: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // backgroundColor:"white",
    bottom: 0,
    left: 0,
    padding: 8,
    borderEndStartRadius:4,
    borderTopLeftRadius:4,
  },
  textInput: {
    width: '89%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
  }
})