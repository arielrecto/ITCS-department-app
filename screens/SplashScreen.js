import { View, Image, Text } from "react-native";

export default function () {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View>
          <Image source={require("./../assets/icon.png")} />
        </View>
        <Text style={{ textAlign : "center", fontWeight : 500, marginTop : 5}}>Loading....</Text>
      </View>
    </>
  );
}
