import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  useWindowDimensions,
  Pressable,
  Alert,
} from "react-native";
import {
  getEventData,
  submitEventEvaluation,
} from "./../services/eventService";
import Colors from "../constants/Colors";
import formatDate from "./../utils/formatDate";
import formatDateWithoutHours from "../utils/formatDateWithoutHours";
import RenderHTML from "react-native-render-html";
import FontAwesomeSix from "react-native-vector-icons/FontAwesome6";
import RadioButtonsGroup from "react-native-radio-buttons-group";
import { getItem } from "expo-secure-store";
import evaluationResult from "../utils/evaluationResult";

export default function EventDetailsScreen({ route }) {
  const { eventId } = route.params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [evaluationData, setEvaluationData] = useState([]);
  const [selectedRadioValues, setSelectedRadioValues] = useState({});
  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await getEventData(eventId);
        setData(response);
      } catch (error) {
        console.log("Error fetching event data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEventData();
  }, [eventId]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Event Not Found</Text>
      </View>
    );
  }

  const location = JSON.parse(data.event.location);

  const renderEvaluationForm = (eventData) => {
    if (!eventData.evaluation_form) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#d4d4d4",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No Evaluation Form
          </Text>
        </View>
      );
    }

    if (data.user_has_evaluation) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#d4d4d4",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Already Response
          </Text>
        </View>
      );
    }

    if (data.event_is_done) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#d4d4d4",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Event is Ended
          </Text>
        </View>
      );
    }

    console.log("====================================");
    console.log("evaluation data init:", evaluationData);
    console.log("====================================");
    const evaluationForm = eventData.evaluation_form;
    const form = JSON.parse(evaluationForm.form);

    return (
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "capitalize",
            padding: 20,
            fontSize: 20,
          }}
        >
          {form.title}
        </Text>

        {form.fields.map((field) => {
          return (
            <View key={field.localId}>
              <Text>{field.question}</Text>
              {field.input_type === "radio" ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                  }}
                >
                  {renderRadioButton(field, "default")}
                </View>
              ) : (
                <View style={{ marginBottom: 10 }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: Colors.accent,
                      padding: 10,
                      marginTop: 10,
                    }}
                    placeholder="feed back"
                    onChangeText={(text) =>
                      handleInputText(field, text, "default")
                    }
                  />
                </View>
              )}
            </View>
          );
        })}

        {form.speakers.map((speaker, index) => {
          let parentId = index + 1;
          return (
            <View key={index}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Host : {speaker.name}
              </Text>

              {speaker.fields.map((field, index) => {
                return (
                  <View key={index}>
                    <Text>{field.question}</Text>
                    {renderRadioButton(field, `p-${parentId}`)}
                  </View>
                );
              })}
            </View>
          );
        })}

        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              backgroundColor: Colors.accent,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => submitEvaluation()}
          >
            <Text style={{ color: Colors.base }}>Submit</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const handleInputRadio = (field, selectedValue, parentLocalId) => {
    setSelectedRadioValues((prevState) => ({
      ...prevState,
      [field.localId]: selectedValue,
    }));

    console.log("====================================");
    console.log("initial data evaluation data", evaluationData);
    console.log("====================================");

    const isExistInArray = evaluationData.find(
      (item) => item.localId === field.localId
    );

    if (isExistInArray !== undefined) {
      const newArray = evaluationData.filter(
        (item) => item.localId !== field.localId
      );

      setEvaluationData([
        ...newArray,
        {
          ...field,
          data: selectedValue,
        },
      ]);

      return;
    }
    setEvaluationData([
      ...evaluationData,
      {
        ...field,
        data: selectedValue,
        groupName: parentLocalId,
      },
    ]);
  };

  const handleInputText = (field, textValue, parentLocalId) => {
    const fieldExist = evaluationData.find(
      (item) => item.localId === field.localId
    );

    if (fieldExist !== undefined) {
      const newArray = evaluationData.filter(
        (item) => item.localId !== field.localId
      );

      setEvaluationData([
        ...newArray,
        {
          ...field,
          data: textValue,
          groupName: parentLocalId,
        },
      ]);

      console.log("====================================");
      console.log(evaluationData);
      console.log("====================================");

      return;
    }

    setEvaluationData([
      ...evaluationData,
      {
        ...field,
        data: textValue,
      },
    ]);
  };

  const renderRadioButton = (radioData, parentLocalId) => {
    let radioButtons = [];
    for (let i = 1; i <= radioData.radio_max; i++) {
      radioButtons = [
        ...radioButtons,
        {
          id: i,
          label: i,
          value: i,
        },
      ];
    }

    const selectedId = selectedRadioValues[radioData.localId] || null;

    return (
      <RadioButtonsGroup
        radioButtons={radioButtons}
        color={Colors.neutral}
        onPress={(selectedValue) =>
          handleInputRadio(radioData, selectedValue, parentLocalId)
        }
        selectedId={selectedId}
      />
    );
  };

  const calculateAverage = () => {

    const total = evaluationData.reduce((sum, data) => {
      if (data.input_type !== "text") {
        const numericValue = parseFloat(data.data);
        if (!isNaN(numericValue)) {
          return sum + numericValue;
        }
      }

 
      return sum;
    }, 0);

    const totalItemRadio = evaluationData.filter((item) => item.input_type !== 'text');



    const average = Number(total / totalItemRadio.length).toFixed(2);

    console.log('====================================');
    console.log('average', average, total, "totalITem", totalItemRadio.length );
    console.log('====================================');
    return average;
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  const submitEvaluation = async () => {
    try {
      const average = calculateAverage();
      const defaultFields = evaluationData.filter(
        (item) => item.groupName === "default"
      );

      const evaForm = {
        ...data.event.evaluation_form,
        form: {
          ...JSON.parse(data.event.evaluation_form.form),
          fields: [
            ...defaultFields,
          ],
        },
      };

      const speakers = evaForm.form.speakers.map((speaker, index) => {
        speaker.fields = [
          ...evaluationData.filter(
            (item) => item.groupName === `p-${index + 1}`
          ),
        ];
        return speaker;
      })


      evaForm.form.speakers = [...speakers]

  

  

      // console.log("====================================");
      // console.log(JSON.stringify(evaForm));
      // console.log("====================================");

      const dataContext = {
        form: evaForm,
        average: average,
        result : evaluationResult(average),
        event_id: data.event.id,
      };


      console.log('====================================');
      console.log(dataContext);
      console.log('====================================');
     

      const response = await submitEventEvaluation(data.event.ref, dataContext);

      Alert.alert("Form Submit", response.message);

      const event = await getEventData(eventId);

      setData(event);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.log("====================================");
      console.log(error.response?.data);
      console.log("====================================");
      Alert.alert("Bad Request", error.response?.data.message);
     
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: data.event.image }}
          style={{ height: 200, width: 400 }}
        />
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            textTransform: "capitalize",
            fontWeight: "bold",
            letterSpacing: 4,
            textAlign: "center",
          }}
        >
          {data.event.name}
        </Text>

        <Text style={{ fontSize: 10, textAlign: "right", paddingTop: 10 }}>
          {formatDate(data.event.created_at)}
        </Text>
        <Text
          style={{ fontSize: 15, fontWeight: "bold", color: Colors.accent }}
        >
          Event Information
        </Text>

        <View
          style={{ flex: 2, flexDirection: "row", gap: 10, marginVertical: 10 }}
        >
          <View
            style={{
              flex: 1,
              height: 100,
              backgroundColor: Colors.neutral,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <FontAwesomeSix
                name="arrow-trend-up"
                style={{ color: Colors.base }}
                size={20}
              ></FontAwesomeSix>
              <Text style={{ color: Colors.base, textAlign: "center" }}>
                Average
              </Text>
            </View>

            <Text
              style={{ color: Colors.base, fontSize: 30, textAlign: "center" }}
            >
              {data.event_evaluation_average}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 100,
              backgroundColor: Colors.accent,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <FontAwesomeSix
                name="arrow-trend-up"
                style={{ color: Colors.base }}
                size={20}
              ></FontAwesomeSix>
              <Text style={{ color: Colors.base, textAlign: "center" }}>
                Result
              </Text>
            </View>
            <Text
              style={{ color: Colors.base, fontSize: 25, textAlign: "center" }}
            >
              {data.event_evaluation_result}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 5, padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Event Start</Text>
            <Text style={{ fontSize: 12 }}>
              {formatDateWithoutHours(data.event.start_date)}
            </Text>
          </View>
          <View style={{ gap: 5, padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Event End</Text>
            <Text style={{ fontSize: 12 }}>
              {formatDateWithoutHours(data.event.end_date)}
            </Text>
          </View>
        </View>

        <View style={{ gap: 5, padding: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Address</Text>
          <Text style={{ fontSize: 12 }}>{location.address}</Text>
          {/* <RenderHTML
            source={{ html: data.event.description }}
            contentWidth={width}
          /> */}
        </View>

        <View style={{ gap: 5, padding: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Description</Text>
          <RenderHTML
            source={{ html: data.event.description }}
            contentWidth={width}
          />
        </View>
        <Text
          style={{ fontSize: 15, fontWeight: "bold", color: Colors.accent }}
        >
          Speaker/Host Information
        </Text>

        {data.event.hosts.map((host) => (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 5, padding: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Last Name</Text>
                <Text style={{ fontSize: 12 }}>{host.speaker.last_name}</Text>
              </View>
              <View style={{ gap: 5, padding: 10 }}>
                <Text style={{ fontWeight: "bold" }}>First Name</Text>
                <Text style={{ fontSize: 12 }}>{host.speaker.first_name}</Text>
              </View>
              <View style={{ gap: 5, padding: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Middle Name</Text>
                <Text style={{ fontSize: 12 }}>{host.speaker.middle_name}</Text>
              </View>
            </View>
            <View style={{ gap: 5, padding: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Occupation</Text>
              <Text style={{ fontSize: 12 }}>{host.speaker.occupation}</Text>
            </View>
          </>
        ))}

        <View style={{ padding: 10 }}>
          <Text
            style={{ fontSize: 15, fontWeight: "bold", color: Colors.accent }}
          >
            Evaluation Form
          </Text>

          {renderEvaluationForm(data.event)}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 300,
    flexGrow: 1,
  },
});
