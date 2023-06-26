import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import styles from "./styles";

import ManagerCollaborators from "./manager/Collaborators/index";
import ManagerPointPresences from "./manager/PointPresences/index";
import ManagerProfiles from "./manager/Profiles/index";

import ClockInIcon from '../.././assets/svg/clockin.svg';
import DashIcon from '../.././assets/svg/dashboard.svg';
import PerfilIcon from '../.././assets/svg/person.svg';

const Tab = createBottomTabNavigator();

function HomeManger() {

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
        name="ManagerPointPresences"
        component={ManagerPointPresences}
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
        name="ManagerCollaborators"
        component={ManagerCollaborators}
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
        name="ManagerProfiles"
        component={ManagerProfiles}
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
export default HomeManger;