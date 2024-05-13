import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Modal,
    Alert,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function UserSettings({ navigation }) {
    const [name, setName] = useState("Kathyrn");
    const [email, setEmail] = useState("ka*********11@gmail.com");
    const [password, setPassword] = useState("1234");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState("");
    const [enteredNamePassword, setEnteredNamePassword] = useState("");
    const [enteredEmailPassword, setEnteredEmailPassword] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleSaveName = () => {
        setName(newName);
        setIsEditingName(false);
    };

    const handleSaveEmail = () => {
        setEmail(newEmail);
        setIsEditingEmail(false);
    };

    const handleSavePassword = () => {
        setPassword(newPassword);
        setIsEditingPassword(false);
    };

    const handleCancelName = () => {
        setIsEditingName(false);
        setEnteredNamePassword("");
    };

    const handleCancelEmail = () => {
        setIsEditingEmail(false);
        setEnteredEmailPassword("");
    };

    const handleCancelPassword = () => {
        setIsEditingPassword(false);
        setEnteredPassword("");
    };

    const verifyPasswordAndSaveName = () => {
        if (enteredNamePassword === password) {
            handleSaveName();
        } else {
            Alert.alert("Invalid Password", "Please enter the correct password to save changes.");
        }
    };

    const verifyPasswordAndSaveEmail = () => {
        if (enteredEmailPassword === password) {
            handleSaveEmail();
        } else {
            Alert.alert("Invalid Password", "Please enter the correct password to save changes.");
        }
    };

    const verifyPasswordAndSavePassword = () => {
        if (enteredPassword === password) {
            handleSavePassword();
        } else {
            Alert.alert("Invalid Password", "Please enter the correct password to save changes.");
        }
    };

    const handleDeleteAccount = () => {
        setIsDeleteModalVisible(true);
    };

    const confirmDeleteAccount = () => {
        if (enteredPassword === password) {
            setIsDeleteModalVisible(false);
            navigation.navigate("LoginScreen");
        } else {
            Alert.alert("Invalid Password", "Please enter the correct password to delete your account.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>My Account</Text>
                    <View style={styles.settingContainer}>
                        <Text style={styles.settingLabel}>Name:</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>{name}</Text>
                            <TouchableOpacity onPress={() => setIsEditingName(true)}>
                                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {isEditingName && (
                            <View style={styles.editContainer}>
                                <TextInput
                                    placeholder="Enter New Name"
                                    onChangeText={setNewName}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Enter Password"
                                    value={enteredNamePassword}
                                    onChangeText={setEnteredNamePassword}
                                    secureTextEntry={true}
                                    style={styles.passwordInput}
                                />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={verifyPasswordAndSaveName} style={styles.saveButton}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleCancelName} style={styles.cancelButton}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.settingContainer}>
                        <Text style={styles.settingLabel}>Email:</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>{email}</Text>
                            <TouchableOpacity onPress={() => setIsEditingEmail(true)}>
                                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {isEditingEmail && (
                            <View style={styles.editContainer}>
                                <TextInput
                                    placeholder="Enter New Email"
                                    onChangeText={setNewEmail}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Enter Password"
                                    value={enteredEmailPassword}
                                    onChangeText={setEnteredEmailPassword}
                                    secureTextEntry={true}
                                    style={styles.passwordInput}
                                />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={verifyPasswordAndSaveEmail} style={styles.saveButton}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleCancelEmail} style={styles.cancelButton}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.settingContainer}>
                        <Text style={styles.settingLabel}>Password:</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>{"********"}</Text>
                            <TouchableOpacity onPress={() => setIsEditingPassword(true)}>
                                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {isEditingPassword && (
                            <View style={styles.editContainer}>
                                <TextInput
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={true}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Enter Current Password"
                                    value={enteredPassword}
                                    onChangeText={setEnteredPassword}
                                    secureTextEntry={true}
                                    style={styles.passwordInput}
                                />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={verifyPasswordAndSavePassword} style={styles.saveButton}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleCancelPassword} style={styles.cancelButton}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.deleteAccountContainer}>
                        <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteAccountButton}>
                            <Text style={styles.deleteAccountText}>Delete Account</Text>
                            <MaterialCommunityIcons name="account-remove" size={24} color="red" style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        visible={isDeleteModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setIsDeleteModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Delete Account</Text>
                                <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                                <TextInput
                                    placeholder="Enter Password"
                                    value={enteredPassword}
                                    onChangeText={setEnteredPassword}
                                    secureTextEntry={true}
                                    style={styles.passwordInput}
                                />
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity onPress={confirmDeleteAccount} style={styles.deleteButton}>
                                        <Text style={styles.buttonText}>Delete Account</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)} style={styles.cancelButton}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
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
    settingContainer: {
        marginBottom: 20,
    },
    settingLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    valueContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    valueText: {
        fontSize: 18,
        marginRight: 10,
        color: "gray",
    },
    editText: {
        fontSize: 16,
        color: "blue",
    },
    editContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "gray",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        color: "#333",
        width: '60%',
    },
    passwordInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "gray",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        color: "#333",
        width: '60%',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#17C3CE",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: "#808080",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
    },
    deleteAccountContainer: {
        alignItems: "center",
    },
    deleteAccountButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    deleteAccountText: {
        fontSize: 18,
        color: "red",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: "row",
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
});

export default UserSettings;
