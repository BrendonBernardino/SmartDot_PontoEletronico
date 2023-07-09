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
import Loading from '../components/Loading/Loading';

import ENV from '../../env';

const apiUrl = ENV.API_URL;

const Tab = createBottomTabNavigator();

function HomeTabs() {
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequisition = async () => {
    setIsLoading(true);
    try {
      const storedRole = await AsyncStorage.getItem('role');
      if (storedRole !== null) {
        setRole(storedRole);
      }
    } catch (error) {
      console.log(error);
      // Tratar o erro de acordo com a sua lógica
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRequisition();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF7D4'}}>
        <Loading/>
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
      {role != 'collaborator_pending' ? (
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
