import React, { useRef, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Print from "expo-print";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import AgendaItem from "./AgendaItem";
//import testIDs from "./testIDs";

const leftArrowIcon = require("../../images/previous.png");
const rightArrowIcon = require("../../images/next.png");

interface MedicationData {
  hour: string;
  title: string;
  dosage: string;
  food: string;
  date: string;
}

interface CalendarItem {
  title: string;
  data: MedicationData[];
}

const generateMedicationData = (
  date: string,
  medicationNames: string[]
): MedicationData[] => {
  const hours = ["12am", "4pm", "5pm", "8pm", "11pm"]; // Sample hours
  return medicationNames.map((medicationName, index) => ({
    hour: hours[index % hours.length],
    title: medicationName,
    dosage: "12mg", // Add dosage logic if needed
    food: Math.random() > 0.5 ? "yes" : "no",
    date,
  }));
};

const generateMonthData = (): CalendarItem[] => {
  const medicationNames = [
    "Aspirin",
    "Metformin",
    "Amlodipine",
    "Levothyroxine",
    "Omeprazole",
    "Losartan",
    "Ibuprofen",
    "Atorvastatin",
    "Acetaminophen",
    "Simvastatin",
    // Add more medication names as needed
  ];

  const startDate = new Date(2024, 2, 1); // Month is zero-based (January is 0)
  const endDate = new Date(2024, 2, 31); // Assuming February has 28 days

  const monthData: CalendarItem[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    const randomMedicationCount = Math.floor(Math.random() * 5) + 1; // Randomly generate 1 to 5 medications per day
    const selectedMedications = Array.from(
      { length: randomMedicationCount },
      () => medicationNames[Math.floor(Math.random() * medicationNames.length)]
    );

    const medicationData = generateMedicationData(
      dateString,
      selectedMedications
    );

    monthData.push({
      title: dateString,
      data: medicationData,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return monthData;
};

const ITEMS: CalendarItem[] = generateMonthData();
//console.log(ITEMS);

interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const { weekView } = props;
  const todayBtnTheme = useRef({
    todayButtonTextColor: "#17C3CE",
  });

  // Step 1: Add state to keep track of the selected date
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onDateChanged = useCallback((date, updateSource) => {
    console.log("ExpandableCalendarScreen onDateChanged: ", date, updateSource);

    // Step 4: Toggle the selected date when the user taps on a date
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
  }, []);

  const onMonthChange = useCallback(({ dateString }) => {
    console.log("ExpandableCalendarScreen onMonthChange: ", dateString);
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  // Step 4: Conditionally render AgendaList based on selectedDate
  const renderAgendaList = () => {
    if (selectedDate) {
      return (
        <AgendaList
          sections={ITEMS.filter((item) => item.title === selectedDate)}
          renderItem={renderItem}
          sectionStyle={styles.section}
        />
      );
    }
    return null;
  };

  // Step 5: Add a function to handle printing logic
  const handlePrintMonthly = async () => {
    try {
      // Step 6: Generate HTML content for printing
      const htmlContent = `
      <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Monthly Agenda</h1>
        ${ITEMS.map(
          (item) => `
            <h2>${item.title}</h2>
            <table>
              <tr>
                <th>Hour</th>
                <th>Title</th>
                <th>Dosage</th>
                <th>Food</th>
              </tr>
              ${item.data
                .map(
                  (event) => `
                    <tr>
                      <td>${event.hour}</td>
                      <td>${event.title}</td>
                      <td>${event.dosage}</td>
                      <td>${event.food}</td>
                    </tr>
                  `
                )
                .join("")}
            </table>
          `
        ).join("")}
      </body>
    </html>
  `;

      // Step 7: Print the HTML content
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      console.log("Printing cancelled error", error);
    }
  };

  return (
    <CalendarProvider
      date={ITEMS[1]?.title}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      //disabledOpacity={0}
      theme={todayBtnTheme.current}
      todayBottomMargin={25}
    >
      {weekView ? (
        <WeekCalendar
          //testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
        />
      ) : (
        <ExpandableCalendar
          //testID={testIDs.expandableCalendar.CONTAINER}
          // horizontal={false}
          //hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          //calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          //calendarStyle={styles.calendar}
          // markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          animateScroll
          // closeOnDayPress={false}
        />
      )}
      {/* Step 5: Add a "Print Monthly" button */}
      <TouchableOpacity onPress={handlePrintMonthly} style={styles.printButton}>
        <Text style={styles.buttonText}>Print Current Month</Text>
      </TouchableOpacity>

      {/* Step 6: Render AgendaList conditionally */}
      {renderAgendaList()}
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: "#f2f7f7",
    color: "grey",
    textTransform: "capitalize",
  },
  // Step 10: Add styles for the "Print Monthly" button
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
});

export default ExpandableCalendarScreen;
