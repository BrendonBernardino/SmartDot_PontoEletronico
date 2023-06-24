import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Switch } from 'react-native-switch';
// import { Ionicons } from 'react-native-vector-icons'
// import { SelectList } from 'react-native-dropdown-select-list';
import styles from "./styles";
import CardDashboard from "../../../components/CardDashboard/CardDashboard";
import ReloadIcon from '../../../../assets/svg/reload.svg';
import FooterMenu from "../../../components/FooterMenu/collaborator";
import { StackTypes } from '../../../../App';

function Perfil() {
    const [day, setDay] = useState(23);
    const [month, setMonth] = useState(5);
    const [year, setYear] = useState(2023);
    const [showMode, setShowMode] = useState("Mês");

    return (
        <View style={[styles.container, { backgroundColor: "#FFF7D4" }]}>

        </View >
    )
}
export default Perfil;