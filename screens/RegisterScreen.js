import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import SelectDropDown from "react-native-select-dropdown";
import Colors from "../constants/Colors";
import FormTextInput from "../components/FormTextInput";
import DocumentPicker from "react-native-document-picker";
import { useState } from "react";
import axios from "axios";

export default function ({ navigation }) {
  const [credential, setCredential] = useState({
    last_name: "",
    first_name: "",
    middle_name: null,
    age: "",
    gender: "",
    address: "",
    course: "",
    student_id: "",
    section: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const genderSelection = [{ name: "Male" }, { name: "Female" }];

  const registerHandler = async () => {
    try {
      setErrors({});
      console.log("====================================");
      console.log("hello");
      console.log("====================================");
      const response = await axios.post(
        "https://live.itcsdept.com/api/mobile/student",
        credential
      );

      Alert.alert("Register Success", response.data.message);

      navigation.navigate('login')
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.error);

        console.log("====================================");
        console.log(errors);
        console.log("====================================");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 5 }}>
        <Text style={{ fontSize: 30, textAlign: "center", fontWeight: 500 }}>
          Register
        </Text>
      </View>

      <FormTextInput
        label="Last Name"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            last_name: text,
          })
        }
        errors={errors.last_name}
      />
      <FormTextInput
        label="First Name"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            first_name: text,
          })
        }
        errors={errors.first_name}
      />
      <FormTextInput
        label="Middle Name (optional)"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            middle_name: text,
          })
        }
      />
      <FormTextInput
        label="Age"
        keyBoardType="numeric"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            age: text,
          })
        }
        errors={errors.age}
      />
      <View style={{ padding: 10 }}>
        <Text>Gender</Text>
        <SelectDropDown
          data={genderSelection}
          onSelect={(selectedItem, index) => {
            setCredential({
              ...credential,
              gender: selectedItem.name,
            });
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem?.name}
                </Text>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        {errors?.gender?.map((error) => {
          return (
            <Text style={{ color: Colors.error, fontSize: 10 }}>{error}</Text>
          );
        })}
      </View>
      <FormTextInput
        label="Address"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            address: text,
          })
        }
        errors={errors.address}
      />
      <FormTextInput
        label="Student ID"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            student_id: text,
          })
        }
        errors={errors.student_id}
      />
      <FormTextInput
        label="Course"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            course: text,
          })
        }
        errors={errors.course}
      />
      <FormTextInput
        label="Section"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            section: text,
          })
        }
        errors={errors.section}
      />
      <FormTextInput
        label="Display Name"
        keyBoardType="text"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            name: text,
          })
        }
        errors={errors.name}
      />
      <FormTextInput
        label="Email"
        keyBoardType="email"
        onChangeText={(text) =>
          setCredential({
            ...credential,
            email: text,
          })
        }
        errors={errors.email}
      />
      <FormTextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={(text) =>
          setCredential({
            ...credential,
            password: text,
          })
        }
        errors={errors.password}
      />
      <FormTextInput
        label="Confirm Password"
        secureTextEntry={true}
        onChangeText={(text) =>
          setCredential({
            ...credential,
            password_confirmation: text,
          })
        }
      />

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: Colors.accent,
            borderRadius: 10,
          }}
          onPress={() => registerHandler()}
        >
          <Text
            style={{ textAlign: "center", color: Colors.base, fontWeight: 500 }}
          >
            Register
          </Text>
        </Pressable>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Text>Already Have Account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.accent }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.base,
    flex: 1,
    paddingVertical: 40,
  },
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
