import React, { useState, useEffect, useRef, useId } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Card, List } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProgressBar } from "react-native-paper";
import * as Speech from "expo-speech";
import { Camera } from "expo-camera";
import { firebaseDatabase } from "../services/firebaseDatabase";

function ListView({ navigation, items, onItemPress, photoUri }) {
  return (
    <>
      {items.map((item) => (
        <View style={styles.list} key={item.id}>
          <List.Item
            title={item.title}
            // description={`${item.time} | ${item.status}`}
            description={`${item.time}`}
            left={() => (
              <MaterialCommunityIcons
                name={
                  item.completed ? "checkbox-marked" : "checkbox-blank-outline"
                }
                color={"#17C3CE"}
                size={40}
                onPress={() => onItemPress(item.id)}
              />
            )}
            right={() => (
              <MaterialCommunityIcons
                name="arrow-right"
                color={"#17C3CE"}
                size={35}
                onPress={() => navigation.navigate("DetailScreen", { photoUri })}
              />
            )}
          />
        </View>
      ))}
    </>
  );
}

function HomeScreen({ navigation, route}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [medications, setMedications] = useState([
    {
      id: 1,
      title: "Gabapentin",
      time: "10:43 PM",
      status: "Not Taken",
      completed: false,
      photoUri: null, // Add photoUri field to store the photo URI
    },
    {
      id: 2,
      title: "Losartan",
      time: "11:00 PM",
      status: "Not Taken",
      completed: false,
    },
    {
      id: 3,
      title: "Albuterol",
      time: "11:30 PM",
      status: "Not Taken",
      completed: false,
    },
  ]);

  let cameraRef = useRef();
  const [openCamera, setOpenCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState(null); // Update to initialize photo as null

  // State for the photo URI
  const [photoUri, setPhotoUri] = useState(null);

  const [notification, setNotification] = useState(null);

  // Handle photo URI from navigation
  useEffect(() => {
    if (route.params?.photoUri) {
        const receivedPhotoUri = route.params.photoUri;

        console.log("home page: "+ receivedPhotoUri)
        setPhotoUri(receivedPhotoUri);

        // Mark the first medication with ID = 1 as completed
        setMedications((prevMedications) =>
            prevMedications.map((med) =>
                med.id === 1 ? { ...med, completed: true } : med
            )
        );

        setNotification(null);
    }
}, [route.params?.photoUri]);



  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const { getCurrentUsersInfo } = firebaseDatabase();

  // useEffect(() => {
  //   const fethUserData = async () => {
  //     const userInfo = await getCurrentUsersInfo();
  //     console.log("got the data");
  //     setCurrentUserInfo(userInfo);
  //     setMedications(userInfo.Schedule);
  //   };

  //   fethUserData();
  // }, []);
  
  // Function to calculate time duration in minutes from the current time
  const calculateTimeDuration = (time) => {
    const [time12Hour, meridiem] = time.split(" ");
    const [hours, minutes] = time12Hour.split(":").map(Number);

    // Get current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    let adjustedHours;
    if (hours === 12) {
      // If hours is 12, set adjustedHours based on meridiemS
      adjustedHours = meridiem === "PM" ? 12 : 0;
    } else {
      // Convert hours to 24-hour format if meridiem is PM
      adjustedHours = meridiem === "PM" ? hours + 12 : hours;
    }

    // Calculate total minutes for medication time and current time
    const medicationMinutes = adjustedHours * 60 + minutes;
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    // Calculate duration by subtracting current time from medication time
    let duration = medicationMinutes - currentTotalMinutes;

    // If the duration is negative, add 24 hours (1440 minutes) to get the time until the next day
    if (duration < 0) {
      duration += 1440; // 24 * 60 = 1440 minutes
    }

    return duration;
  };

  
  // Function to check and schedule notifications for medications with duration 0
  const checkAndScheduleNotifications = () => {
    const medicationsToSchedule = medications.filter(
      (medication) => calculateTimeDuration(medication.time) === 0
    );

    setNotification(true);
    
    medicationsToSchedule.forEach((medication) => {
      speakMedicationReminder(medication.title, medication.completed);
    });
  };

  const speakMedicationReminder = async (medicationTitle, isComplete) => {
    try {

      if(!isComplete){
        await Speech.speak(
          `It's time to take ${medicationTitle}. Take one pill, from yellow bottle, then take the picture.`
        );
      }
      
      // Open camera for photo upload when reminding to take medication
      // setCameraVisible(true);
      // Store the selected medication for photo upload
      // const selectedMed = medications.find(
      //   (med) => med.title === medicationTitle
      // );
      // setSelectedMedication(selectedMed);
    } catch (error) {
      console.error("Speech API error:", error);
    }
  };

  const handleItemPress = async (itemId) => {
    setMedications((prevMedications) =>
      prevMedications.map((medication) =>
        medication.id === itemId
          ? { ...medication, completed: !medication.completed }
          : medication
      )
    );

    // Check if the medication is marked as completed and speak the text
    const selectedMedication = medications.find(
      (medication) => medication.id === itemId
    );
    if (selectedMedication && !selectedMedication.completed) {
      try {
        await Speech.speak(
          `You Have Marked ${selectedMedication.title} as taken`
        );
      } catch (error) {
        console.error("Speech API error:", error);
      }
    }
  };

  const completedCount = medications.filter(
    (medication) => medication.completed
  ).length;

  const totalMedications = medications.length;

  // Calculate progress
  let progress = totalMedications > 0 ? completedCount / totalMedications : 0;

  // Filter medications based on search query
  const filteredMedications = medications.filter((medication) =>
    medication.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if any medication is due now
  const isMedicationDue = medications.some(
    (medication) => calculateTimeDuration(medication.time) === 0
  );

  // if (openCamera) {
  //   return (
  //     <Camera style={styles.camContainer} ref={cameraRef}>
  //       <View style={styles.buttonContainer}>
  //         <Button title="Take Pic" onPress={takePic} />
  //       </View>
  //     </Camera>
  //   );
  // }

  // let takePic = async () => {
  //   let options = {
  //     quality: 1,
  //     base64: true,
  //     exif: false,
  //   };

  //   let newPhoto = await cameraRef.current.takePictureAsync(options);
  //   setPhoto(newPhoto);
  // };

  // if (photo) {
  //   setOpenCamera(false);
  // }

  useEffect(() => {
    const fetchCameraPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    };

    fetchCameraPermission();
  }, []);

  useEffect(() => {
    //get the users information on the start of screen

    // Check time duration and schedule notifications initially
    checkAndScheduleNotifications();

    // Set interval to check and schedule notifications every minute
    const intervalId = setInterval(() => {
      //console.log("checking and scheduling notification");
      checkAndScheduleNotifications();
    }, 10000); // 10000 milliseconds = 10 sec

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [medications]);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  useEffect(() => {
    if (photo) {
      setOpenCamera(false);
    }
  }, [photo]);
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        theme={{
          colors: {
            primary: "#17C3CE",
            elevation: { level3: "#F5F5F5" },
            onSurfaceVariant: "#17C3CE",
          },
        }}
      />

      <View style={styles.nameContainer}>
        <Text variant="displayMedium">Hello,</Text>
        <Text variant="headlineLarge">
          {currentUserInfo ? currentUserInfo.Name.split(" ")[0] : "Jobanpreet"}
        </Text>
      </View>

      <Card style={styles.progressCard}>
        <Card.Content>
          <Text style={styles.progressTitle} variant="titleLarge">
            Your Progress For Today
          </Text>
          <ProgressBar progress={progress} color={"#17C3CE"} />
          <Text variant="bodyLarge">
            {completedCount} of {medications.length} completed
          </Text>
        </Card.Content>
      </Card>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subheading}>
          <Text variant="displaySmall">Daily List</Text>
        </View>
        {medications.length > 0 ? (
          // Render the ListView component if there are medications
          <ListView
            navigation={navigation}
            items={filteredMedications}
            onItemPress={handleItemPress}
            photoUri={photoUri}
          />
        ) : (
          // Render fallback content when medications array is empty
          <Text>No medications scheduled for today.</Text>
        )}
      </ScrollView>

      {isMedicationDue && ( // Render the button only if medication is due
        <TouchableOpacity
          style={styles.printButton}
          onPress={() => {navigation.navigate("Camera")}}
        >
          <Text style={styles.buttonText}>Take Picture Now</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: "auto",
    padding: 30,
    paddingBottom: 0,
  },
  nameContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  progressCard: {
    borderWidth: 5,
    backgroundColor: "beige",
    borderRadius: 20,
    height: 120,
  },
  progressTitle: {
    paddingBottom: 30,
  },
  subheading: {
    paddingTop: 20,
  },
  list: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    paddingLeft: 10,
  },
  printButton: {
    flexDirection: "row",
    backgroundColor: "#17C3CE",
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
  camContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});

export default HomeScreen;
