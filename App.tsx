import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeTabs from "./src/screens/HomeTabs";
import HomeManager from "./src/screens/HomeManager";
import Initial from "./src/screens/auth/Initial/initial";
import Login from "./src/screens/auth/Login/login";
import Register from "./src/screens/auth/Register/register";
import Perfil from "./src/screens/colab/Perfil/perfil";
import About from "./src/screens/auth/About/about";
import Toast from 'react-native-toast-message'

export type StackNavigation = {
  Initial: undefined;
  Login: undefined;
  Perfil: undefined;
  About: undefined;
  Register: undefined;
  HomeTabs: undefined;
  HomeManager: undefined;
};

const Stack = createNativeStackNavigator();

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Initial"
            component={Initial}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }} />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }} />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }} />
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }} />
          <Stack.Screen
            name="HomeManager"
            component={HomeManager}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}