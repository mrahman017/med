import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import { firbaseAuth } from "../services/firebaseAuth";
import * as Speech from "expo-speech";

export default function SettingsScreen({ navigation }) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [textSize, setTextSize] = useState(14);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [alarmSoundModalVisible, setAlarmSoundModalVisible] = useState(false);
  const [selectedAlarmSound, setSelectedAlarmSound] = useState("default");

  const toggleNotificationSwitch = () =>
    setIsNotificationsEnabled((prev) => !prev);
  const toggleThemeSwitch = () => setIsDarkTheme((prev) => !prev);
  const openNotificationOptions = () => setNotificationModalVisible(true);
  const closeNotificationOptions = () => setNotificationModalVisible(false);
  const openAlarmSoundOptions = () => setAlarmSoundModalVisible(true);
  const closeAlarmSoundOptions = () => setAlarmSoundModalVisible(false);

  const { signOut } = firbaseAuth();

  const onSignOutPressed = async () => {
    try {
      await signOut(navigation);
    } catch (error) {
      console.log("error on sign out setting Screen line 31");
    }
  };

  const setAlarmOptionAndClose = (option) => {
    closeNotificationOptions();
    if (option === "alarmMusic") {
      openAlarmSoundOptions();
    }
  };

  const alarmSounds = [
    { label: "Default", value: "default" },
    { label: "Chirping Birds", value: "chirpingBirds" },
    { label: "Classic Bell", value: "classicBell" },
  ];

  const handleCaregiverNotification = async () => {
    try {
      await Speech.speak(
        `Your Caregiver has been Alerted and will call you soon!`
      );
    } catch (error) {
      console.error("Speech API error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={[styles.title, { fontSize: textSize }]}>Settings</Text>

          <TouchableOpacity
            onPress={onSignOutPressed}
            style={styles.notificationIcon}
          >
            <Icon name="log-out-outline" size={30} color="#17C3CE" />
          </TouchableOpacity>
        </View>

        {/* Notification Settings */}
        <View style={styles.settingRow}>
          <Text style={styles.text}>Notification</Text>
          <TouchableOpacity
            onPress={openNotificationOptions}
            style={styles.notificationIcon}
          >
            <Icon name="notifications-outline" size={30} color="#17C3CE" />
          </TouchableOpacity>
        </View>

        {/* Notifications Switch */}
        <View style={styles.settingRow}>
          <Text style={styles.text}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isNotificationsEnabled ? "#17C3CE" : "#f4f3f4"}
            onValueChange={toggleNotificationSwitch}
            value={isNotificationsEnabled}
          />
        </View>

        {/* Text Size Slider */}
        <View style={styles.settingRow}>
          <Text style={styles.text}>Text Size</Text>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={30}
            minimumTrackTintColor="#1FB28A"
            maximumTrackTintColor="#000000"
            value={textSize}
            onValueChange={setTextSize}
          />
        </View>

        {/* Theme Switch */}
        <View style={styles.settingRow}>
          <Text style={styles.text}>Dark Theme</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isDarkTheme ? "#17C3CE" : "#f4f3f4"}
            onValueChange={toggleThemeSwitch}
            value={isDarkTheme}
          />
        </View>

        {/* Account Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need HELP?</Text>
          {/* <Button
            title="Manage Account"
            onPress={() => navigation.navigate("UserSettings")}
          />
          <Button
            title="Manage Caregiver's Account"
            onPress={() => navigation.navigate("Caregivers")}
          /> */}
        </View>

        {/* Other Settings */}
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>More Settings</Text>
          {/* Implement additional settings as needed */}
          {/* <Button title="Privacy Policy" onPress={() => {}} /> */}
          {/* <Button title="Terms of Service" onPress={() => {}} /> */}
          {/* <Button title="Sign out" onPress={onSignOutPressed} /> */}
          <TouchableOpacity
            onPress={handleCaregiverNotification}
            style={styles.printButton}
          >
            <Text style={styles.buttonText}>CONTACT CAREGIVER</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Options Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={notificationModalVisible}
          onRequestClose={closeNotificationOptions}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Notification Options</Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => setAlarmOptionAndClose("vibration")}
              >
                <Icon name="volume-vibrate-outline" size={24} color="#333" />
                <Text style={styles.modalOptionText}>Vibration</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => setAlarmOptionAndClose("silent")}
              >
                <Icon name="volume-off-outline" size={24} color="#333" />
                <Text style={styles.modalOptionText}>Silent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => setAlarmOptionAndClose("alarmMusic")}
              >
                <Icon name="musical-notes-outline" size={24} color="#333" />
                <Text style={styles.modalOptionText}>Alarm Music</Text>
              </TouchableOpacity>
              <Button title="Close" onPress={closeNotificationOptions} />
            </View>
          </View>
        </Modal>

        {/* Alarm Sound Options Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={alarmSoundModalVisible}
          onRequestClose={closeAlarmSoundOptions}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choose Alarm Sound</Text>
              <RNPickerSelect
                items={alarmSounds}
                onValueChange={(value) => setSelectedAlarmSound(value)}
                value={selectedAlarmSound}
                style={{ inputAndroid: styles.pickerInput }}
              />
              <Button title="Close" onPress={closeAlarmSoundOptions} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  slider: {
    width: 200,
    height: 40,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  notificationIcon: {
    padding: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  modalOptionText: {
    marginLeft: 10,
    fontSize: 16,
  },

  pickerInput: {
    fontSize: 16,
    paddingVertical: 10,
  },
  titlecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically centered
    paddingHorizontal: 10, // Adjust the horizontal padding as needed
  },
  logoutIcon: {
    marginLeft: "auto", // Push the icon to the right
  },

  printButton: {
    flexDirection: "row",
    backgroundColor: "#ff0f0f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
});
