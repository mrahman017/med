import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";

// import the screen as components
import HomeScreen from "../Screens/HomeScreen";
import CalendarScreen from "../Screens/CalendarScreen";
import AddMedicationScreen from "../Screens/AddMedicationScreen";
import ChatScreen from "../Screens/ChatScreen";
import SettingsScreen from "../Screens/SettingsScreen";

// const Tab = createBottomTabNavigator();

const Tab = createMaterialBottomTabNavigator();

//editing the theme little bit for now in here
// we can latter put it into different file

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#17C3CE"
      inactiveColor="#BBBBBB"
      labeled={false}
      barStyle={{ backgroundColor: "#FAFAFA" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddMedicationScreen}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabNavigation() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";
  return <Tabs />;
}
