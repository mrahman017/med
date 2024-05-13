import React, { useState } from "react";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
// import { emailValidator } from '../helpers/emailValidator'
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Image } from "react-native";
import { firbaseAuth } from "../services/firebaseAuth";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const { resetPassword } = firbaseAuth();

  const sendResetPasswordEmail = async () => {
    try {
      await resetPassword(email, navigation);
    } catch (error) {
      console.log("error on ResetPasswordScreen line 18");
      console.log(error)
    }


    //now clear the fields
    setEmail("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.png")} />
      <Header>Reset your password.</Header>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with the reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Continue
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: 30,
  },
  logo: {
    objectFit: "contain",
    width: "auto",
  },
});
