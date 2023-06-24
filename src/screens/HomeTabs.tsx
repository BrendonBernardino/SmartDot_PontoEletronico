import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import styles from "./styles";
import ClockIn from "./colab/ClockIn/clockin";
import Dashboard from "./colab/Dashboard/dashboard";
import Perfil from "./colab/Perfil/perfil";

import ClockInIcon from '../.././assets/svg/clockin.svg';
import DashIcon from '../.././assets/svg/dashboard.svg';
import PerfilIcon from '../.././assets/svg/person.svg';

const Tab = createBottomTabNavigator();

function HomeTabs() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#C07F00",
        tabBarInactiveTintColor: "#4C3D3D",
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,

          bottom: 20,
          left: 100,
          right: 100,
          elevation: 5,
          borderRadius: 20,
          height: 50,
          width: 210,
        }
      }}
    >
      <Tab.Screen
        name="ClockIn"
        component={ClockIn}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Animatable.View
                  animation="zoomIn"
                  duration={2000}
                >
                  <ClockInIcon
                    style={styles.iconFooter}
                    color={color}
                    width={size}
                    height={size}
                  />
                </Animatable.View>
              )
            }
            return (
              <Animatable.View
                animation="zoomIn"
                duration={2000}
              >
                <ClockInIcon
                  style={styles.iconFooter}
                  color={color}
                  width={size}
                  height={size}
                />
              </Animatable.View>
            )
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Animatable.View
                  animation="zoomIn"
                  duration={2000}
                >
                  <DashIcon
                    style={styles.iconFooter}
                    color={color}
                    width={size}
                    height={size}
                  />
                </Animatable.View>
              )
            }
            return (
              <Animatable.View
                animation="zoomIn"
                duration={2000}
              >
                <DashIcon
                  style={styles.iconFooter}
                  color={color}
                  width={size}
                  height={size}
                />
              </Animatable.View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Animatable.View
                  animation="zoomIn"
                  duration={2000}
                >
                  <PerfilIcon
                    style={styles.iconFooter}
                    color={color}
                    width={30}
                    height={30}
                  />
                </Animatable.View>
              )
            }
            return (
              <Animatable.View
                animation="zoomIn"
                duration={2000}
              >
                <PerfilIcon
                  style={styles.iconFooter}
                  color={color}
                  width={30}
                  height={30}
                />
              </Animatable.View>
            )
          }
        }}
      />
    </Tab.Navigator>
  );
}
export default HomeTabs;