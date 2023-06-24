import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles"
import { StackTypes } from '../../../App';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClockInIcon from '../../../assets/svg/clockin.svg';
import DashIcon from '../../../assets/svg/dashboard.svg';
import PerfilIcon from '../../../assets/svg/person.svg';

interface Props {
  actual: 1 | 2 | 3;
  rightPage: string;
  centerPage: string;
  leftPage: string;
  mode?: unknown;
}


export default function (props: Props) {
  const navigation = useNavigation<StackTypes>();

  const [colorOne, setColorOne] = useState("#4C3D3D");
  const [colorTwo, setColorTwo] = useState("#4C3D3D");
  const [colorThree, setColorThree] = useState("#4C3D3D");

  function ColorControl() {
    if(props.actual == 1) {
      setColorOne("#C07F00");
      setColorTwo("#4C3D3D");
      setColorThree("#4C3D3D");
    }
    if(props.actual == 2) {
      setColorOne("#4C3D3D");
      setColorTwo("#C07F00");
      setColorThree("#4C3D3D");
    }
    if(props.actual == 3) {
      setColorOne("#4C3D3D");
      setColorTwo("#4C3D3D");
      setColorThree("#C07F00");
    }
  }

  useEffect(() => {
    ColorControl();
}, [props.actual]);

  return (
    <View style={styles.containerFooter}>
      <TouchableOpacity onPress={() => navigation.navigate(props.leftPage, props.mode)}>
        <ClockInIcon style={styles.iconFooter} color={colorOne} width={28} height={28}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(props.centerPage, props.mode)}>
        <DashIcon style={styles.iconFooter} color={colorTwo} width={28} height={28}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(props.rightPage, props.mode)}>
        <PerfilIcon style={styles.iconFooter} color={colorThree} width={28} height={30}/>
      </TouchableOpacity>
    </View>
  )
}
