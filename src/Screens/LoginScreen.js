import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Header from "../components/Header";
import { firbaseAuth } from "../services/firebaseAuth";
import { firebaseDatabase } from "../services/firebaseDatabase.js";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = firbaseAuth();

  const onLoginPressed = async () => {
    // try {
    //   //sign in
    //   await signIn(email, password, navigation);
    // } catch (error) {
    //   console.log("error on signing In Login Screen line 23");
    // }

    navigation.navigate("Tabs");
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.png")} />
      <Header>Welcome</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>
      <View style={styles.row}>
        <Text>You do not have an account yet ?</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Create !</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: "#000000",
  },
  link: {
    fontWeight: "bold",
    color: "#000000",
  },
  logo: {
    objectFit: "contain",
    width: "auto",
  },
});
