import { View, TextInput, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

export default function ({label, errors = [], ...rest}) {
  return (
    <View style={{ padding: 10 }}>
      <View style={{ columnGap: 10 }}>
        <Text style={{ fontSize: 15 }}>{label}</Text>
        <TextInput placeholder={label} style={styles.textInput} {...rest}/>
        {errors.map((error) => {
          return (
            <Text key={error} style={{color : Colors.error, fontSize: 10}}>{error}</Text>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.accent,
    padding: 10,
    marginTop: 10,
  },
});
