import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "./../constants/Colors";


export default function ({ title, icon, contentCount = 0}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          {icon}
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.number}>{contentCount}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  titleWrapper: {
    display : "flex",
    flexDirection : "row",
    alignItems : "center",
    gap : 15
  },
  title: {
    color: Colors.base,
    fontSize: 20,
  },
  number: {
    fontSize: 50,
    color: Colors.base,
    textAlign: "center",
  },
});
