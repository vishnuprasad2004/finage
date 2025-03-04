import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemedBackground from '@/components/ThemedBackground'
import { ThemedText } from '@/components/ThemedText'
import { useAuth } from '@/context/auth'
import Spacer from '@/components/Spacer'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { supabase } from '@/config/supabase'

const Profile = () => {
  const { session } = useAuth();



  return (
    <ThemedBackground style={{padding:15}}>
      <Text style={{color:"#319A36", fontSize:30, fontWeight:'700'}}>Profile</Text>
      <Spacer margin={4}/>
      <View style={{display:"flex", gap:4, margin:10,padding: 10, backgroundColor:"#44444444", borderRadius:5 }}>  
        <ThemedText style={{fontSize:18, fontWeight:'300'}}>Name: {session?.user.user_metadata?.name}</ThemedText>
        <ThemedText style={{fontSize:18, fontWeight:'300'}}>Email: {session?.user.email}</ThemedText>
        <ThemedText style={{fontSize:18, fontWeight:'300'}}>Gender: {session?.user.user_metadata?.gender == 1 ? "Male" : "Female"}</ThemedText>
        <ThemedText style={{fontSize:18, fontWeight:'300'}}>Martial Status: {session?.user.user_metadata?.martial_status == 0 ? "Single" : "Married"}</ThemedText>
        <ThemedText style={{fontSize:18, fontWeight:'300'}}>Payment History: {session?.user.user_metadata?.payment_history}</ThemedText>
      </View>

      {/* Transaction History */}
      {/* <Spacer margin={4}/>
      <Text style={{color:"#319A36", fontSize:30, fontWeight:'700'}}>Transaction History</Text>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={{display:"flex", gap:4}}>
            
          </View>
        </ScrollView>
      </GestureHandlerRootView> */}
      <TouchableOpacity onPress={() => {supabase.auth.signOut()}} style={{backgroundColor:"#319A36", padding:10, borderRadius:5, alignItems:"center"}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </ThemedBackground>
  )
}

export default Profile

const styles = StyleSheet.create({})