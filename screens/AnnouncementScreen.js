import { useEffect, useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { getAnnouncement } from "../services/announcementService";
import RenderHTML from "react-native-render-html";
import formatDate from "../utils/formatDate";

export default function ({ route }) {
  const { announcementId } = route.params;
  const [announcement, setAnnouncement] = useState();
  const [isLoading, setISLoading] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    async function runEffect() {
      try {
        const response = await getAnnouncement(announcementId);

        setAnnouncement(response.announcement);
      } catch (error) {
        console.log(error);
      } finally {
        setISLoading(false);
      }
    }

    runEffect();
  }, [announcementId]);

  if (isLoading) {
    return (
      <>
        <View>
          <Text>Loading...</Text>
        </View>
      </>
    );
  }

  if (!announcement) {
    return (
      <View>
        <Text>Announcement Not Found</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "capitalize",
              letterSpacing: 2,
              textAlign: "center",
              padding: 20,
              borderBottomColor: "gray",
              borderBottomWidth: 2,
            }}
          >
            {announcement.title}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "gray",
              textAlign: "right",
              padding: 5,
            }}
          >
            Date Posted :{formatDate(announcement.created_at)}
          </Text>
          <View style={{ padding: 10, backgroundColor: "#d4d4d4", borderRadius : 10}}>
            <RenderHTML
              source={{ html: announcement.description }}
              contentWidth={width}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
