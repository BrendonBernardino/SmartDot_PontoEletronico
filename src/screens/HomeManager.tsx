import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import styles from "./styles";
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';

import ManagerCollaborators from "./manager/Collaborators/index";
import ManagerPointPresences from "./manager/PointPresences/index";
import ManagerProfiles from "./manager/Profiles/index";

import DashIcon from '../.././assets/svg/dashboard.svg';
import EmployeeIcon from '../.././assets/svg/colaborador.svg';
import PerfilIcon from '../.././assets/svg/person.svg';
import Loading from '../components/Loading/Loading';

import ENV from '../../env';

const apiUrl = ENV.API_URL;

const Tab = createBottomTabNavigator();

function HomeManager() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRequisition = async () => {
    const url = `${apiUrl}/manager/info`;

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
        // setRole(data.role_active);
        setIsLoading(false)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível carregar'
        });
        setIsLoading(false)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error)
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    handleRequisition();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF7D4' }}>
        <Loading />
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
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
                  <EmployeeIcon
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
                <EmployeeIcon
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
export default HomeManager;