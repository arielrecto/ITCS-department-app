import {
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { getEventList } from "../services/eventService";
import { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import formatDate from "./../utils/formatDate";
import formatDateWithoutHours from "./../utils/formatDateWithoutHours";

export default function ({navigation}) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function runEffect() {
      try {
        setIsLoading(true);
        const response = await getEventList();

        setEvents([...response.events]);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    runEffect();
  }, []);

  if (isLoading) {
    return <Text>IsLoading</Text>;
  }

  const renderEvent = (event) => {
    return (
      <View
        key={event.id}
        style={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textTransform: "capitalize",
            padding: 10,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {event.name}
        </Text>
        <Text style={{ textAlign: "right", fontSize: 10, padding: 10 }}>
          Posted At: {formatDate(event.created_at)}
        </Text>
        <Image
          source={{ uri: event.image }}
          style={{ width: 400, height: 200 }}
          onError={(error) => console.log("Image loading error:", error)}
        />

        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 10 }}>
            Start Date: {formatDateWithoutHours(event.start_date)}
          </Text>
          <Text style={{ fontSize: 10 }}>
            End Date: {formatDateWithoutHours(event.end_date)}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: Colors.accent,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}


        >
          <Text
            style={{
              textTransform: "capitalize",
              color: Colors.base,
              fontSize: 15,
              textAlign: "center",
            }} 
            onPress={
              () => navigation.navigate('Event', {eventId : event.id})
            }
          >
            Read
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {events.map((event) => {
          return renderEvent(event);
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
