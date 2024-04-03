import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AuthContext from "./contexts/AuthContext";
import { loadUser, logout } from "./services/authService";
import { useState, useEffect } from "react";
import { getToken, setToken } from "./services/tokenService";
import SplashScreen from "./screens/SplashScreen";
import EventListScreen from "./screens/EventListScreen";
import EventScreen from "./screens/EventScreen";
import { Pressable, Text, Alert } from "react-native";
import MaterialICon from "react-native-vector-icons/MaterialIcons";
import AnnouncementListScreen from "./screens/AnnouncementListScreen";
import AnnouncementScreen from "./screens/AnnouncementScreen";

export default function App() {
  const [user, setUser] = useState();
  const [isLoading, setISLoading] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function runEffect() {
      try {
        setISLoading(true);
        await getToken();

        const response = await loadUser();

        setUser(response);
      } catch (error) {
        if (error.response?.status === 401) {
          await setToken(null);
          setUser(null);
          return;
        }
        console.log(error);
      } finally {
        setISLoading(false);
      }
    }
    runEffect();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  const logoutAction = async () => {
    try {
      const response = await logout();

      setUser(null);

      Alert.alert("Logout", response.message);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="home"
                component={HomeScreen}
                options={{
                  title : "Home",
                  headerRight: () => (
                    <Pressable onPress={() => logoutAction()}>
                      <MaterialICon name="logout" size={22} />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="Event List"
                component={EventListScreen}
                options={{
                  title : "Events",
                  headerRight: () => (
                    <Pressable onPress={() => logoutAction()}>
                      <MaterialICon name="logout" size={22} />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="Event"
                component={EventScreen}
                options={{
                  title : "Event",
                  headerRight: () => (
                    <Pressable onPress={() => logoutAction()}>
                      <MaterialICon name="logout" size={22} />
                    </Pressable>
                  ),
                }}
              />

              <Stack.Screen 
                name="announcements"
                component={AnnouncementListScreen}
                options={{
                  title : "Announcements",
                  headerRight: () => (
                    <Pressable onPress={() => logoutAction()}>
                      <MaterialICon name="logout" size={22} />
                    </Pressable>
                  ),
                }}
              />
               <Stack.Screen 
                name="announcement"
                component={AnnouncementScreen}
                options={{
                  title : "Announcement",
                  headerRight: () => (
                    <Pressable onPress={() => logoutAction()}>
                      <MaterialICon name="logout" size={22} />
                    </Pressable>
                  ),
                }}
              />

              
            </>
          ) : (
            <>
              <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="register"
                component={RegisterScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
