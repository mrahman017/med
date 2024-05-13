import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import { Text } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Button from "../components/Button";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import { theme } from "../components/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { firbaseAuth } from "../services/firebaseAuth";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const { createAccount } = firbaseAuth();

  const onSignUpPressed = async () => {
    try {
      await createAccount(name, email, password, role, navigation);
    } catch (error) {
      console.log("error on sign up RegisterScreen line 23");
    }

    //now clear the fields
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.png")} />
      <Header>Register</Header>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name}
          onChangeText={(name) => setName(name)}
        />
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
      </ScrollView>

      {/* Add the radio buttons for role selection */}
      <View style={styles.row}>
        <Text>Select Role:</Text>
        <RadioButton.Group onValueChange={setRole} value={role}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="patient" color="#17C3CE" />
            <Text>Patient</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="caregiver" color="#17C3CE" />
            <Text>Caregiver</Text>
          </View>
        </RadioButton.Group>
      </View>

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>I already have an account !</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Log in</Text>
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
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  logo: {
    objectFit: "contain",
    width: "auto",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
});
