import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Colors from "./../constants/Colors";
import Card from "../components/Card";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import { getData } from "../services/dashboardServices";
import RenderHTML from "react-native-render-html";
import formatDate from "../utils/formatDate";

export default function ({ navigation }) {
  const [dashboard, setDashboard] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    async function runEffect() {
      setIsLoading(true);
      const response = await getData();

      setDashboard(response);
      setIsLoading(false);
    }

    runEffect();
  }, []);

  if (isLoading) {
    return <Text>IsLoading</Text>;
  }

  const latestAnnouncementDescription =
    dashboard?.latest_announcement?.description;

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Scanner");
          }}
          style={{
            padding: 10,
            backgroundColor: Colors.secondary,
            width: 60,
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <IonIcon name="scan" size={30} />
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          navigation.navigate("announcements");
        }}
      >
        <Card
          title="Announcements"
          icon={
            <IonIcon
              name="megaphone"
              style={{ color: Colors.base }}
              size={20}
            />
          }
          contentCount={dashboard?.total_announcement}
          bgColor={Colors.neutral}
        />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("Event List");
        }}
      >
        <Card
          title="Events"
          icon={
            <MaterialIcon
              name="event"
              style={{ color: Colors.base }}
              size={20}
            />
          }
          contentCount={dashboard?.total_event}
        />
      </Pressable>

      <View style={styles.contentSection}>
        <Text style={styles.contentSectionTitle}>Latest Announcement</Text>

        {latestAnnouncementDescription ? (
          <View style={styles.content}>
            <Text style={styles.contentTitle}>
              {dashboard?.latest_announcement?.title}
            </Text>
            <Text style={{ textAlign: "right", fontSize: 5, marginTop: 5 }}>
              Date Posted :{" "}
              {formatDate(dashboard?.latest_announcement?.created_at)}
            </Text>
            <RenderHTML
              source={{ html: latestAnnouncementDescription }}
              contentWidth={width}
            />
          </View>
        ) : (
          <Text style={{ textAlign: "center", padding: 5 }}>
            No announcement available
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Attendances");
        }}
      >
        <View style={{ padding: 10 }}>
          <Text
            style={{
              backgroundColor: Colors.secondary,
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              paddingVertical: 20,
              borderRadius : 40
            }}
          >
            Attendance Record
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base,
  },
  contentSection: {
    padding: 10,
    gap: 5,
  },
  contentSectionTitle: {
    fontWeight: "bold",
  },
  contentTitle: {
    fontWeight: "bold",
    fontSize: 25,
    textTransform: "capitalize",
    letterSpacing: 4,
    textAlign: "center",
  },
  content: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
});
