import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Switch } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

function AddMedicationScreen({ navigation }) {
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [withFood, setWithFood] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onToggleSwitch = () => setWithFood(!withFood);

  const handleBarcodeScanner = () => {
    //navigation.navigate('BarcodeScannerScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Add Medication</Text>
        <TextInput
          placeholder="Medication Name"
          style={styles.inputLarge}
          value={medication}
          onChangeText={setMedication}
          placeholderTextColor="#6e6e6e"
        />
        <TextInput
          placeholder="Dosage in mg"
          style={styles.inputLarge}
          value={dosage}
          onChangeText={setDosage}
          placeholderTextColor="#6e6e6e"
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <Text style={styles.label}>Take with food?</Text>
          <Switch value={withFood} onValueChange={onToggleSwitch} />
        </View>
        <TouchableOpacity
          style={styles.buttonLarge}
          onPress={() => setShow(true)}
        >
          <Text style={styles.buttonText}>Set Reminder Time</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChange}
          />
        )}

        <TouchableOpacity
          style={styles.buttonLarge}
          onPress={handleBarcodeScanner}
        >
          <MaterialCommunityIcons name="barcode-scan" size={24} color="#fff" />
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLarge}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
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
  header: {
    fontSize: 24,
    color: "#17C3CE",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputLarge: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonLarge: {
    flexDirection: "row",
    backgroundColor: "#17C3CE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
  // Adjust other styles as needed
});

export default AddMedicationScreen;
