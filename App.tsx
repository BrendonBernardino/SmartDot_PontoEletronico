import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Initial, Login } from "./screens/auth";
import Initial from "./src/screens/auth/Initial/initial";
import Login from "./src/screens/auth/Login/login";
import About from "./src/screens/auth/About/about";

export type StackNavigation = {
  Initial: undefined;
  Login: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator();

export type StackTypes = NativeStackNavigationProp<StackNavigation>

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
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{
            headerBackVisible: false,
            headerShown: false,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}