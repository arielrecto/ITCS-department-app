import { View, Image, Text } from "react-native";

export default function () {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View>
          <Image source={require("./../assets/icon.png")} />
          <Text style={{alignItems : "center", fontWeight : 500, width : "100%"}}>Loading....</Text>
        </View>
      </View>
    </>
  );
}
