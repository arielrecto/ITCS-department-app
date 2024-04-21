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
import { attendance } from "../services/eventService";

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

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
      await submitAttendance(data)
  };

  const submitAttendance = async (ref) => {

    try {

  

       const response = await attendance(ref);

      setScannedData(response.message)
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      
    } catch (error) {
      console.log('====================================');
      console.log(error.response.data);
      console.log('====================================');
    }
  }

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
        
            <Text>{scannedData}</Text>
      
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
