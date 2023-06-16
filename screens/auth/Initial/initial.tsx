import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather, Entypo } from 'react-native-vector-icons'
// import { Card } from 'react-native-shadow-cards'
import { Card } from 'react-native-paper';
import Button from "../../../components/Button/Button";
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../../styles/themes/colors';

type StackNavigation = {
    SmartDot: undefined;
    Login: undefined;
};
  
type StackTypes = NativeStackNavigationProp<StackNavigation>

function Initial() {
    const [themeMode, setThemeMode] = useState(COLORSLIGHT);
    const navigation = useNavigation<StackTypes>();
  
    return (
      <View style={[styles.container, {backgroundColor: themeMode.primary}]}>
        <View style={styles.themeBar}> 
          <View style={[styles.themeCard, {backgroundColor: themeMode.primary}]}>
            <TouchableOpacity /*onPress={setLightMode}> */>
              <Feather name="sun" size={25}/>
            </TouchableOpacity>
            <TouchableOpacity /*onPress={setDarkMode}*/>
              <Entypo name="moon" size={25}/>
            </TouchableOpacity>
          </View>
        </View> 
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={require('../../assets/Logo.png')}
          />
          <Text style={styles.title}>SmartDot</Text>
        </View>
        <View style={styles.buttons}>
          <Button 
            text="Entrar"
            color={themeMode.tertiary} 
            textColor={themeMode.primary} 
            borderTopLeftRadius={33} 
            elevation={5}
            centralized={1}
          />
          <Button 
            text="Criar Conta"
            color={themeMode.auxiliar} 
            textColor={themeMode.primary} 
            borderBottomRightRadius={33}
            elevation={5}
            centralized={1}
          />
        </View>
        <View style={styles.info}>
          <Text style={{color: "#83908D", fontWeight: "bold", fontSize: 19, paddingBottom: "10%"}}>Mais sobre o projeto</Text>
        </View>
      </View>
    )
  }
  export default Initial;