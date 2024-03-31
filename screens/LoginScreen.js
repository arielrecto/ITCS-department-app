import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import FormTextInput from "../components/FormTextInput";
import { useState } from "react";
import axios from "./../utils/axios";
import { login } from "./../services/authService";

export default function ({ navigation }) {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const loginHandle = async () => {
    setErrors({});
    try {
      console.log(navigation);
      await login(credential);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.error);

        console.log(errors);
      }

      if (error.response?.status === 401) {
        setErrors(error.response.data.error);
        Alert.alert("Incorrect Credentials", errors.credentials);
        console.log(errors);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 5 }}>
        <Text style={{ fontSize: 30, textAlign: "center", fontWeight: 500 }}>
          Login
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          marginVertical: 40,
        }}
      >
        <Image
          source={require("./../assets/splash.png")}
          style={{ height: 100, width: 100 }}
        ></Image>
        <Text style={{ fontWeight: 400, fontSize: 20 }}>ITCS Department</Text>
      </View>

      <FormTextInput
        label="Email"
        keyBoardType="email"
        onChangeText={(text) => {
          setCredential({
            ...credential,
            email: text,
          });
        }}
        errors={errors?.email}
      />
      <FormTextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setCredential({
            ...credential,
            password: text,
          });
        }}
        errors={errors?.password}
      />
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: Colors.accent,
            borderRadius: 10,
          }}
          onPress={() => loginHandle()}
        >
          <Text
            style={{ textAlign: "center", color: Colors.base, fontWeight: 500 }}
          >
            Login
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
          <Text>Don't Have Account</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.accent }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.base,
    flex: 1,
    paddingVertical: 40,
  },
});
