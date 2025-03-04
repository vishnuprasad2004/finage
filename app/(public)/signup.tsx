import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ThemedBackground from '@/components/ThemedBackground'
import { router } from 'expo-router'
import Spacer from '@/components/Spacer'
import Header from '@/components/Header'

const SignUp = () => {
  console.log("SignUp");
  
  const [name, setNameField] = useState<string>("");
  const [email, setEmailField] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleFormSubmit = () => {
    console.log("Form Submitted");
    
    // setLoading(true);
    if(name.length <= 2 || email.length <= 2 || password.length <= 2 || !name || !email || !password) {
      console.log("Please fill all fields");
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    router.push({ pathname: "/(public)/form", params: { name, email, password }})
  }


  return (
    <ThemedBackground style={styles.page}>
      <Header/>
      <View>
      <Text style={styles.text}>Signup</Text>
      <Text style={{color:"white"}}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={name}
        onChangeText={setNameField} // Updates the state with the input value
        placeholderTextColor={"#aaa"}
        keyboardType="default"
      />
      <Spacer margin={4} />
      <Text style={{color:"white"}}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmailField} // Updates the state with the input value
        keyboardType="email-address"
        autoComplete="email"
        placeholderTextColor={"#aaa"}
        autoCapitalize="none"
      />
      <Spacer margin={4} />
      <Text style={{color:"white"}}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword} // Updates the state with the input value
        secureTextEntry={true}
        keyboardType="default"
        autoCapitalize="none"
        placeholderTextColor={"#aaa"}
      />

      <Spacer margin={4} />
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={{ color: "white" }}>CONTINUE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => router.push("/(public)/signin")}>
        <Text style={{ color: "white" }}>Already have an Account, Login then !</Text>
      </TouchableOpacity>
    </View>
    </ThemedBackground>
  )
}

export default SignUp

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#222",
    color: "#fff",
  },
  page: {
    padding: 20,
    height: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: "#ffffffdd",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  font: {
    fontFamily: "Poppins-SemiBold",
  },
  button: {
    backgroundColor: '#319A36',
    padding: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  }
});