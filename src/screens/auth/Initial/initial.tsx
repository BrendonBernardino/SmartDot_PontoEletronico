import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Feather, Entypo } from 'react-native-vector-icons'
import Button from "../../../components/Button/Button";
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../../styles/themes/colors';
import { StackTypes } from '../../../../App';
import LogoIcon from '../../../.././assets/svg/Logosvg.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface Croma {
  themeModeCroma: any;
  changethemeModeCroma: (croma: any) => void;
};

export const useCromaChange = create<Croma>((set) => ({
  themeModeCroma: COLORSLIGHT,
  changethemeModeCroma(croma) {
    set((state) => ({...state, themeModeCroma:croma}))
  }
}));

function Initial() {
  // const [themeMode, setThemeMode] = useState(COLORSLIGHT);
  const navigation = useNavigation<StackTypes>();
  const { themeModeCroma } = useCromaChange();
  const { changethemeModeCroma } = useCromaChange();

  const setLightMode = () => {
    if (themeModeCroma === COLORSDARK) {
      // setThemeMode(COLORSLIGHT);
      changethemeModeCroma(COLORSLIGHT);
    }
  };
  const setDarkMode = () => {
    if (themeModeCroma === COLORSLIGHT) {
      // setThemeMode(COLORSDARK);
      changethemeModeCroma(COLORSDARK);
    }
  };

  const redirectPage = async () => {
    try {
        const role = await AsyncStorage.getItem('role');
        switch (role) {
            case 'manager':
                navigation.navigate("HomeManager");
                break;
            case 'collaborator_pending':
                navigation.navigate("Perfil");
                break;
            case 'collaborator_banned':
                navigation.navigate("Perfil");
                break;
            case 'collaborator_active':
                navigation.navigate("HomeTabs");
                break;
            default:
                break;
        }
      } catch (error) {
          console.log(error);
      }
  };

  const handleEntrar = () => {
    navigation.navigate("Login");
  };

  const handleRegistrar = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    redirectPage();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: themeModeCroma.primary }]}>
      <View style={styles.themeBar}>
        <View style={[
          styles.themeCard,
          { backgroundColor: themeModeCroma === COLORSLIGHT ? themeModeCroma.primary : themeModeCroma.secundary }
        ]}>
          <TouchableOpacity onPress={setLightMode}>
            <Feather name="sun" size={25} style={{ color: themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.gray }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={setDarkMode}>
            <Entypo name="moon" size={25} style={{ color: themeModeCroma === COLORSLIGHT ? themeModeCroma.gray_erased : themeModeCroma.tertiary }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.top}>
        <Image
          style={styles.logo}
          source={themeModeCroma === COLORSLIGHT ? require('../../../../assets/Logosvg_1.png') : require('../../../../assets/Logosvg_2.png')}
        />
        <View style={styles.titleLayer}>
          <Text style={[styles.title, { color: themeModeCroma.tertiary, paddingLeft: '7%' }]}>Smart</Text>
          <Text style={[styles.title, { color: themeModeCroma.auxiliar, paddingRight: '7%' }]}>Dot</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          text="Entrar"
          color={themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.secundary}
          textColor={themeModeCroma === COLORSLIGHT ? themeModeCroma.text : themeModeCroma.text_2}
          elevation={5}
          centralized={1}
          onPress={handleEntrar}
          mode={themeModeCroma}
        />
        <Button
          text="Criar Conta"
          color={themeModeCroma === COLORSLIGHT ? themeModeCroma.auxiliar : themeModeCroma.tertiary}
          textColor={themeModeCroma.text}
          elevation={5}
          centralized={1}
          onPress={handleRegistrar}
          mode={themeModeCroma}
        />
      </View>
      <View style={styles.info}>
        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <Text
            style={{
              color: themeModeCroma.gray, fontWeight: "bold", fontSize: 19, paddingBottom: "10%"
            }}
          >Mais sobre o projeto</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Initial;