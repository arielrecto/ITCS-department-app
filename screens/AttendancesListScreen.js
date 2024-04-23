import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { getAttendance } from "../services/attendanceService";
import { Table, TableWrapper, Row } from "react-native-table-component";
import formatDate from "../utils/formatDate";
export default function () {
  const [attendances, setAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  this.state = {
    tableHead: ["name", "Time in", "Time Out", "Event", "Date"],
    widthArr: [120, 80, 80, 120, 150],
  };
  useEffect(() => {
    async function runEffect() {
      try {
        setIsLoading(true);
        const response = await getAttendance();

        console.log(response);

        setAttendances(response.attendances);
      } catch (error) {
        console.log("====================================");
        console.log(error.response.data.message);
        console.log("====================================");
      } finally {
        setIsLoading(false);
      }
    }
    runEffect();
  }, []);

  if (isLoading) {
    return <>{<Text>Loading...</Text>}</>;
  }

  return (
    <>
      <ScrollView horizontal={true} style={{ padding: 10 }}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  attendances.map((attendance, index) => (
                    <Row
                      key={index}
                      data={[
                        attendance.user.name,
                        attendance.time_in,
                        attendance.time_out,
                        attendance.event ? attendance.event.name : "N/A",
                        formatDate(attendance.created_at),
                      ]}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});
