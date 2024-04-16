import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Pressable,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function () {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Pressable onPress={() => setScanned(false)}>
              <Text>Tap to Scan Again</Text>
            </Pressable>
          )}
        </View>

        <Text>Result</Text>
        {!scannedData ? (
          <Text style={{fontWeight : "bold"}}>No Result</Text>
        ) : (
          <Pressable style={{padding : 5, display : "flex", flexDirection : "row", gap : 10}} onPress={() => Linking.openURL(scannedData)}>
            <Text style={{fontWeight : "bold"}}>Go to: </Text>
            <Text style={{color : "blue", textDecorationLine : "underline"}}>{scannedData}</Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
  },
});
