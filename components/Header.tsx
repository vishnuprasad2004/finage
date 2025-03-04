import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", gap: 4, width: "100%", position: "absolute", top: 10, left: 10, right: 0, zIndex: 100 }}
    >
      <Image
        source={require("@/assets/images/logo_tr.png")}
        style={{ width: 120, height: 50 }}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
