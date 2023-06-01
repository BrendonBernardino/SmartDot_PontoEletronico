import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../styles/themes/colors';

type StackNavigation = {
    SmartDot: undefined;
    Login: undefined;
};
  
type StackTypes = NativeStackNavigationProp<StackNavigation>

function Initial() {
    const [themeMode, setThemeMode] = useState(COLORSLIGHT);
    const navigation = useNavigation<StackTypes>();
  
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require('../../assets/Logo.png')}
          />
          <Text>SmartDot</Text>
        </View>
        <TouchableOpacity style={[styles.buttom, {backgroundColor: themeMode.tertiary, borderTopLeftRadius: 33, elevation: 5}]} onPress={() => navigation.navigate("Login")}>
          <Text style={{color: themeMode.primary, fontWeight: "bold", fontSize: 19}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttom, {backgroundColor: themeMode.auxiliar, borderBottomRightRadius: 33, elevation: 5}]}>
          <Text style={{color: themeMode.primary, fontWeight: "bold", fontSize: 19}}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={{color: "#83908D", fontWeight: "bold", fontSize: 19, paddingBottom: "10%"}}>More about project</Text>
        </View>
      </View>
    )
  }
  export default Initial;