import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect} from "react";
import { Card } from 'react-native-paper';


function DetailScreen({navigation, route}) {
  //const { pillName, pillDosage, nextDose, dose, dosageTimes, totalDays, daysLeft, totalQuantity, quantityLeft, image } = route.params;
  //const imageUrl = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.europeanpharmaceuticalreview.com%2Fnews%2F79399%2Fsmart-pills%2F&psig=AOvVaw3GFVzwGqKXblE5wOU7b4Ej&ust=1708300469537000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKjYqKfJs4QDFQAAAAAdAAAAABAE';

  const [photoUri, setPhotoUri] = useState(null);

  // Handle photo URI from navigation
  useEffect(() => {
    if (route.params?.photoUri) {
        const receivedPhotoUri = route.params.photoUri;

        console.log("detail page: "+ receivedPhotoUri)
        setPhotoUri(receivedPhotoUri);
    }
}, [route.params?.photoUri]);

  return (
    // <SafeAreaView style={styles.container}>
    //   {/* Left Arrow Icon */}
    //   {/*it should take to the home screen */}
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('Tabs')}
    //     style={{ marginTop: 20 }}
    //   >
    //     <MaterialCommunityIcons
    //       name="arrow-left"
    //       size={30}
    //       color="#17C3CE"
    //       style={{}}
    //     />
    //   </TouchableOpacity>

    //   {/* Top Section */}
    //   <View style={{ flexDirection: "row", marginTop: 50 }}>
    //     {/* Medicine Imgae */}
    //     <Image
    //       source={require("../images/gabapentin.png")}
    //       style={{
    //         flex: 1,
    //         objectFit: "contain",
    //         height: "100",
    //         width: "100",
    //       }}
    //     />

    //     {/* Medicine Details */}
    //     <View style={{ flex: 1, marginRight: 10, justifyContent: "flex-end" }}>
    //       <View>
    //         <Text style={{ fontSize: 15, color: "#777d7d" }}>
    //           {"Pill Name:"}
    //         </Text>
    //         <Text style={{ fontSize: 20, color: "#17C3CE" }}>
    //           {"Gabapentin"}
    //         </Text>
    //       </View>
    //       <View style={{ marginVertical: 5 }} />
    //       <View>
    //         <Text style={{ fontSize: 15, color: "#777d7d" }}>{"Dosage:"}</Text>
    //         <Text style={{ fontSize: 20, color: "#17C3CE" }}>{"300 mg"}</Text>
    //       </View>
    //       <View style={{ marginVertical: 5 }} />
    //       <View>
    //         <Text style={{ fontSize: 15, color: "#777d7d" }}>
    //           {"Next Dose:"}
    //         </Text>
    //         <Text style={{ fontSize: 20, color: "#17C3CE" }}>{"9pm"}</Text>
    //       </View>
    //       <View style={{ marginVertical: 5 }} />
    //     </View>
    //   </View>

    //   {/* Middle Section- Details */}
    //   <View
    //     style={{
    //       justifyContent: "center",
    //       alignItems: "left",
    //       flex: 1,
    //     }}
    //   >
    //     <Text style={{ fontSize: 30, fontWeight: "bold" }}>Dose</Text>
    //     <Text
    //       style={{ fontSize: 15, color: "#777d7d" }}
    //     >{`3 times/day   |   9am, 3pm, 9 pm `}</Text>
    //     <View style={{ marginVertical: 10 }} />
    //     <Text style={{ fontSize: 30, fontWeight: "bold" }}>Program</Text>
    //     <Text
    //       style={{ fontSize: 15, color: "#777d7d" }}
    //     >{`Total 30 days   |   23 days left `}</Text>
    //     <View style={{ marginVertical: 10 }} />
    //     <Text style={{ fontSize: 30, fontWeight: "bold" }}>Quantity</Text>
    //     <Text
    //       style={{ fontSize: 15, color: "#777d7d" }}
    //     >{`Total 30 capsules   |   23 capsules left `}</Text>
    //   </View>

    //   {/* Bottom Section- Button*/}
    //   <TouchableOpacity
    //     style={{
    //       backgroundColor: "#17C3CE",
    //       paddingVertical: 15,
    //       paddingHorizontal: 30,
    //       borderRadius: 10,
    //       marginTop: 100,
    //     }}
    //     onPress={() => {
    //       /* it should take to the addSchedule screen */
    //     }}
    //   >
    //     <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
    //       Change Schedule
    //     </Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
            <Card>
                <Card.Content>
                    {/* Display the photo */}
                    <Image
                        source={{ uri: photoUri }}
                        style={styles.image}
                        resizeMode="contain" // Adjust the image to fit the container
                    />
                </Card.Content>
            </Card>

            {/* You can add other UI elements here, such as additional text, buttons, etc. */}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 0,
  //   padding: 30,
  // },
  container: {
    flex: 1,
    padding: 10,
},
image: {
    width: '100%',
    height: '100%', // Adjust the height as needed
},
});

export default DetailScreen;
