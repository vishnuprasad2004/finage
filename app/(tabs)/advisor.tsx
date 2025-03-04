import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedBackground from '@/components/ThemedBackground'
import { Links } from '@/constants/Links';
import { useAuth } from '@/context/auth';
import Spacer from '@/components/Spacer';

const Adivsor = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const { session } = useAuth();


  const postQuery = async () => {
    try {
      const response = await fetch(Links.CHAT_BOT_ADVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Sel_id: session?.user.id }),
      });
  
      const { color, response:res } = await response.json();
      console.log(res);
      
      if (!response.ok) {
        throw new Error(`Error: ${res || "Unknown error"}`);
      }
      
      return { response: res, status: color };
    } catch (error) {
      console.error("Error:", error);
      return { response: "Failed to fetch data", status: "error" };
    }
  };
  
  // useEffect(() => {
  //   setLoading(true);
  //   postQuery().then(({ response, status }) => {
  //     setColor(status);
  //     setResponse(response);
  //   });
  //   setLoading(false);
  // }, []);



  return (
    <ThemedBackground style={{padding: 10}}>
      <View style={{padding: 10, width:"95%"}}>
        <Text style={{color:"#319A36", fontSize:30, fontWeight:'700'}}>Your Financial Advice</Text>
        <Text style={{ fontWeight: "900", fontSize:10, color:"#aaa", }}>The calculation is based on your credit score along with other paramenters.</Text>
        <Spacer margin={4}/>
        {loading ? (<ActivityIndicator size="large"/>) : (<Text style={{ color: color, }}>{response}</Text>)}
      </View>
    </ThemedBackground>
  )
}

export default Adivsor

const styles = StyleSheet.create({

})