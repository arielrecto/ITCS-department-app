import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { getAnnouncementList } from "../services/announcementService";
import formatDate from "../utils/formatDate";
import Colors from "../constants/Colors";

export default function ({ navigation }) {
  const [announcements, setAnnouncements] = useState();
  const [isLoading, setISLoading] = useState(false);

  useEffect(() => {
    async function runEffect() {
      try {
        setISLoading(true);
        const response = await getAnnouncementList();

        console.log(response);

        setAnnouncements(response.announcements);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      } finally {
        setISLoading(false);
      }
    }
    runEffect();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!announcements || announcements.lenght === 0) {
    return (
      <View>
        <Text>No Announcements</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={{ padding: 10 }}>
        {announcements.map((announcement) => {
          return (
            <View
              key={announcement.id}
              style={{
                padding: 20,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                borderRadius: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  {announcement.title}
                </Text>
                <Text style={{ fontSize: 10, color: "gray" }}>
                  Date Posted : {formatDate(announcement.created_at)}
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  navigation.navigate("announcement", {
                    announcementId: announcement.id,
                  })
                }
                style={{
                  backgroundColor: Colors.accent,
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontSize: 10, color: Colors.base }}>
                  Read More
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}
