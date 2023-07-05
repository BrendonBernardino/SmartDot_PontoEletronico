import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import styles from "./styles";
import ClockIn from "./colab/ClockIn/clockin";
import Dashboard from "./colab/Dashboard/dashboard";
import Perfil from "./colab/Perfil/perfil";
import { ActivityIndicator, View } from 'react-native';

import ClockInIcon from '../.././assets/svg/clockin.svg';
import DashIcon from '../.././assets/svg/dashboard.svg';
import PerfilIcon from '../.././assets/svg/person.svg';

import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';

import ENV from '../../env';

const apiUrl = ENV.API_URL;

const Tab = createBottomTabNavigator();

function HomeTabs() {
  const [role, setRole] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequisition = async () => {
    const url = `${apiUrl}/collaborator/users`;

    try {
        setIsLoading(true)
        const token = await AsyncStorage.getItem('token');

          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          });

          if (response.ok) {
              const data = await response.json();
              setRole(data.role_active);
              setIsLoading(false)
          } else {
              Toast.show({
                  type: 'error',
                  text1: 'Não foi possível carregar'
              });
          }
      } catch (error) {
          Toast.show({
              type: 'error',
              text1: String(error)
          });
      }
  };

  useEffect(() => {
    handleRequisition();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
  }

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
        {!role ? (
          <Tab.Screen
            name="Perfil"
            component={Perfil}
            options={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size, focused }) => {
                return (
                  <Animatable.View animation="zoomIn" duration={2000}>
                    <PerfilIcon
                      style={styles.iconFooter}
                      color={color}
                      width={30}
                      height={30}
                    />
                  </Animatable.View>
                );
              },
            }}
          />
        ) : (
          <>
            <Tab.Screen
              name="ClockIn"
              component={ClockIn}
              options={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size, focused }) => {
                  return (
                    <Animatable.View animation="zoomIn" duration={2000}>
                      <ClockInIcon
                        style={styles.iconFooter}
                        color={color}
                        width={30}
                        height={30}
                      />
                    </Animatable.View>
                  );
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
                  return (
                    <Animatable.View animation="zoomIn" duration={2000}>
                      <DashIcon
                        style={styles.iconFooter}
                        color={color}
                        width={30}
                        height={30}
                      />
                    </Animatable.View>
                  );
                },
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
                  return (
                    <Animatable.View animation="zoomIn" duration={2000}>
                      <PerfilIcon
                        style={styles.iconFooter}
                        color={color}
                        width={30}
                        height={30}
                      />
                    </Animatable.View>
                  );
                },
              }}
            />
          </>
        )}
      </Tab.Navigator>
  );
}

export default HomeTabs;
