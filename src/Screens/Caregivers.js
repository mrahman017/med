import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Caregivers({ navigation }) {
    const [email, setEmail] = useState('');
    const [buttonText, setButtonText] = useState('Send Request');
    const [buttonColor, setButtonColor] = useState('#17C3CE');
    const [requestSent, setRequestSent] = useState(false);
    const [caregivers, setCaregivers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCaregiverIndex, setSelectedCaregiverIndex] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedName, setEditedName] = useState('');

    useEffect(() => {
        let timeout;
        if (requestSent) {
            timeout = setTimeout(() => {
                setButtonText('Send Request');
                setButtonColor('#17C3CE');
                setRequestSent(false);
                setEmail('');
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [requestSent]);

    const handleSendRequest = () => {
        const emailExists = caregivers.includes(email);

        if (emailExists) {
            alert('The user has already been added');
        } else {
            setButtonText('Request Sent');
            setButtonColor('#808080');
            setRequestSent(true);
            setCaregivers([...caregivers, email]);
            // Here you can send the request to add caregivers
        }
    };

    const handleDeleteCaregiver = (index) => {
        setSelectedCaregiverIndex(index);
        setModalVisible(true);
    };

    const confirmDeleteCaregiver = () => {
        const updatedCaregivers = [...caregivers];
        updatedCaregivers.splice(selectedCaregiverIndex, 1);
        setCaregivers(updatedCaregivers);
        setModalVisible(false);
    };

    const handleOpenEditModal = (index) => {
        setSelectedCaregiverIndex(index);
        setEditedName(caregivers[index]);
        setEditModalVisible(true);
    };

    const handleSaveEdit = () => {
        const updatedCaregivers = [...caregivers];
        updatedCaregivers[selectedCaregiverIndex] = editedName;
        setCaregivers(updatedCaregivers);
        setEditModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Add Caregivers</Text>
                <TextInput
                    placeholder="Enter their email to add Caregivers"
                    style={styles.inputLarge}
                    placeholderTextColor="#6e6e6e"
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity
                    style={[styles.buttonLarge, { backgroundColor: buttonColor }]}
                    onPress={handleSendRequest}
                    disabled={requestSent}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
                <Text style={styles.agreementText} color="gray">
                    *By adding Caregivers, you are agreeing to give access to manage your account/schedule*
                </Text>
                <Text style={styles.header}>List of Caregivers</Text>
                {caregivers.map((caregiver, index) => (
                    <View key={index} style={styles.caregiverContainer}>
                        <Text>{caregiver}</Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => handleOpenEditModal(index)}>
                                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log("Chat pressed")}>
                                <MaterialCommunityIcons name="chat" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteCaregiver(index)}>
                                <MaterialCommunityIcons name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Are you sure you want to remove as caregiver?</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: "#808080" }]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: "#17C3CE" }]}
                                    onPress={confirmDeleteCaregiver}
                                >
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={() => {
                        setEditModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Edit name</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={editedName}
                                onChangeText={setEditedName}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: "#808080" }]}
                                    onPress={() => setEditModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: "#17C3CE" }]}
                                    onPress={handleSaveEdit}
                                >
                                    <Text style={styles.modalButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
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
    buttonLarge: {
        flexDirection: "row",
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
    agreementText: {
        fontSize: 14,
        color: "#6e6e6e",
        marginBottom: 20,
    },
    caregiverContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    caregiverText: {
        fontSize: 30,
    },
    iconContainer: {
        flexDirection: "row",
    },
    icon: {
        marginLeft: 30,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "gray",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        color: "#333",
        width: 250, // Set a fixed width for the input box
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        minWidth: 100,
        marginHorizontal: 10,
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Caregivers;