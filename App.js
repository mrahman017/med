import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./src/components/TabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./src/Screens/DetailScreen";
import StartScreen from "./src/Screens/StartScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import ResetPasswordScreen from "./src/Screens/ResetPasswordScreen";
import Caregivers from "./src/Screens/Caregivers";
import UserSettings from "./src/Screens/UserSettings";
import Camera from "./src/Screens/Camera";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="Tabs" component={TabNavigation} />

          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="UserSettings" component={UserSettings} />
          <Stack.Screen name="Caregivers" component={Caregivers} />
          <Stack.Screen name="Camera" component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
