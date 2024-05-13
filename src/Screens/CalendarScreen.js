import React from "react";
import ExpandableCalendarScreen from "../components/calendar/expandableCalendarScreen";
import {SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ExpandableCalendarScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarScreen;
