import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Feather, Entypo } from 'react-native-vector-icons'
import Button from "../../../components/Button/Button";
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../../styles/themes/colors';
import { StackTypes } from '../../../../App';
import LogoIcon from '../../../.././assets/svg/Logosvg.svg';

function Initial() {
  const [themeMode, setThemeMode] = useState(COLORSLIGHT);
  const navigation = useNavigation<StackTypes>();

  const setLightMode = () => {
    if (themeMode === COLORSDARK) {
      setThemeMode(COLORSLIGHT);
    }
  };
  const setDarkMode = () => {
    if (themeMode === COLORSLIGHT) {
      setThemeMode(COLORSDARK);
    }
  };

  const handleEntrar = () => {
    navigation.navigate("Login");
  };

  const handleRegistrar = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <View style={styles.themeBar}>
        <View style={[
          styles.themeCard,
          { backgroundColor: themeMode === COLORSLIGHT ? themeMode.primary : themeMode.secundary }
        ]}>
          <TouchableOpacity onPress={setLightMode}>
            <Feather name="sun" size={25} style={{ color: themeMode === COLORSLIGHT ? themeMode.tertiary : themeMode.gray }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={setDarkMode}>
            <Entypo name="moon" size={25} style={{ color: themeMode === COLORSLIGHT ? themeMode.gray_erased : themeMode.tertiary }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.top}>
        <Image
          style={styles.logo}
          source={themeMode === COLORSLIGHT ? require('../../../../assets/Logosvg_1.png') : require('../../../../assets/LogoDark.png')}
        />
        <View style={styles.titleLayer}>
          <Text style={[styles.title, { color: themeMode.tertiary, paddingLeft: '8%' }]}>Smart</Text>
          <Text style={[styles.title, { color: themeMode.auxiliar, paddingRight: '8%' }]}>Dot</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          text="Entrar"
          color={themeMode === COLORSLIGHT ? themeMode.tertiary : themeMode.secundary}
          textColor={themeMode === COLORSLIGHT ? themeMode.text : themeMode.text_2}
          elevation={5}
          centralized={1}
          onPress={handleEntrar}
          mode={themeMode}
        />
        <Button
          text="Criar Conta"
          color={themeMode === COLORSLIGHT ? themeMode.auxiliar : themeMode.tertiary}
          textColor={themeMode.text}
          elevation={5}
          centralized={1}
          onPress={handleRegistrar}
          mode={themeMode}
        />
      </View>
      <View style={styles.info}>
        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <Text
            style={{
              color: themeMode.gray, fontWeight: "bold", fontSize: 19, paddingBottom: "10%"
            }}
          >Mais sobre o projeto</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Initial;