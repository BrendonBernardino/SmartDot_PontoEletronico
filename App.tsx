import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Initial, Login } from "./screens/auth";
import Initial from "./screens/auth/Initial/initial";
import Login from "./screens/auth/Login/login";

type StackNavigation = {
  Initial: undefined;
  Login: undefined;
};

type StackTypes = NativeStackNavigationProp<StackNavigation>

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Initial" 
          component={Initial}
          options={{
            headerShown: false,
          }}/>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}