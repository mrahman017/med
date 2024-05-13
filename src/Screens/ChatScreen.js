import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Speech from 'expo-speech';


function ChatScreen({ navigation }) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const[number,setNumber]= useState(0);
  const scrollViewRef = useRef();

  const response = ["It's widely used to treat high blood pressure (hypertension) and heart failure.", "A heart attack occurs when the flow of blood to the heart is severely reduced or blocked.", "Amoxicillin interacts with medications like warfarin, allopurinol, and probenecid." ]

  const handleSendMessage = () => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;

    const newMessage = {
      id: messages.length,
      text: trimmedMessage,
      sender: "user",
    };
    setMessages([...messages, newMessage]);

    //Mock AI response
    getAIResponse(trimmedMessage).then((response) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: currentMessages.length, text: response, sender: "ai" },
      ]);
      scrollViewRef.current.scrollToEnd({ animated: true });
    });

  
    setMessageText("");
    
    setNumber(number+1);
  };

  const getAIResponse = async (userMessage) => {
    // Simulated AI response
    return new Promise((resolve) => {
      
      setTimeout(() => {
        resolve(
          response[number]
        );

        Speech.speak(response[number])

      }, 1000); // Simulate network request delay
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>MedAlert Chatbot</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={
                message.sender === "user"
                  ? styles.userMessage
                  : styles.aiMessage
              }
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Ask a question..."
            placeholderTextColor="#A8A8A8"
          />

          {/* onPress={startSpeechRecognition} */}
          <TouchableOpacity style={styles.speechButton}>
            <MaterialCommunityIcons
              name="microphone"
              size={40}
              color="#17C3CE"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <MaterialCommunityIcons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // Light background color
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#17C3CE",
    paddingTop: 20,
  },
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#17C3CE", // Teal color for user messages
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#D3ECEF", // Lighter teal color for AI messages
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
  },
  messageText: {
    color: "#333333",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
    paddingHorizontal: 15,
    color: "#333333", // Input text color
  },
  sendButton: {
    backgroundColor: "#17C3CE",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;