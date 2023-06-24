import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeTabs from "./src/screens/HomeTabs";
import Initial from "./src/screens/auth/Initial/initial";
import Login from "./src/screens/auth/Login/login";
import About from "./src/screens/auth/About/about";
import ManagerCollaborators from "./src/screens/manager/Collaborators/index";
import ManagerPointPresences from "./src/screens/manager/PointPresences/index";
import ManagerProfiles from "./src/screens/manager/Profiles/index";

export type StackNavigation = {
  Initial: undefined;
  Login: undefined;
  About: undefined;
  // Register: undefined;
};

const Stack = createNativeStackNavigator();

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Initial"
          component={Initial}
          options={{
            headerShown: false,
          }} /> */}
        {/* <Stack.Screen
          name="About"
          component={About}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }} /> */}
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }} /> */}
        {/* <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }} /> */}
        {/* <Stack.Screen
          name="ClockIn"
          component={ClockIn}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }} /> */}
        {/* <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }} /> */}
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}