import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import Colors from "../constants/Colors";
  import FormTextInput from "../components/FormTextInput";
  import { useState } from "react";
  import { forgotPassword, login } from "./../services/authService";
  
  export default function ({ navigation }) {
    const [credential, setCredential] = useState({
      email: "",
    });
  
    const [errors, setErrors] = useState({});
  

    const submit = async () => {
        try {

           const response = await forgotPassword(credential)

           Alert.alert("Check Your Email Address", "Reset Links is Sent in your email address")
            
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: 30, textAlign: "center", fontWeight: 500 }}>
            Forgot Password
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
          <Text style={{ fontWeight: 400, fontSize: 15, textAlign : "center" }}>Computer Studies Department, CvSU Bacoor City Campus Event Scheduling</Text>
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

        <View style={{padding : 10}}>
        <TouchableOpacity style={{paddingVertical : 20, backgroundColor: Colors.accent, borderRadius : 10}} onPress={() => submit()}>
            <Text style={{fontWeight : "bold", color : "white", textAlign : "center"}}>Reset</Text>
            </TouchableOpacity>


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
  