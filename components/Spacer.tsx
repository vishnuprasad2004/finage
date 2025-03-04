import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacer = ({margin}:{margin:number}) => {
  return (
    <View style={{margin:margin}}></View>
  )
}

export default Spacer

const styles = StyleSheet.create({})