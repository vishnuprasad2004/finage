import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useRef } from "react";
import { useRouter } from "expo-router";
import ThemedBackground from "@/components/ThemedBackground";
import LottieView from "lottie-react-native";
import Spacer from "@/components/Spacer";


function HighlightText({ text }: { text: string }) {
  return <Text style={{ color: "#319A36" }}>{text}</Text>;
}

export default function Welcome() {
  const animation = useRef<LottieView>(null);
  const router = useRouter();

  return (
    <ThemedBackground style={styles.page}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ display: "flex", flexDirection: "row", gap: 4, width: "100%" }}>
        <Image
          source={require("@/assets/images/logo_tr.png")}
          style={{ width: 120, height: 50 }}
        />
      </View>
      <LottieView
        source={require("@/assets/animations/money_animation.json")}
        autoPlay
        loop
        ref={animation}
        style={{ width: "100%", height: 250 }}
      />
      <Text style={styles.text}>
        Let's build a smarter <HighlightText text="financial future"/> together!
      </Text>

      <Spacer margin={4}/>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/(public)/signup")}>
        <Text style={{ color: "black", fontWeight: "800" }}>GET STARTED</Text>
      </TouchableOpacity>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    padding: 12,
    borderRadius: 16,
    width: "100%",
  },
  text: {
    color: "#ffffffdd",
    fontSize: 45,
    fontWeight: "800",
  },
});
