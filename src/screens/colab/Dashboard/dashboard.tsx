import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import CardDashboard from "../../../components/CardDashboard/CardDashboard";
import ReloadIcon from '../../../../assets/svg/reload.svg';
import { StackTypes } from '../../../../App';

function Dashboard() {
    const [day, setDay] = useState(23);
    const [month, setMonth] = useState(5);
    const [year, setYear] = useState(2023);
    const [showMode, setShowMode] = useState("Mês");

    function MonthAjusted() {
        if (month < 10)
            return <Text>0{month}</Text>
        else
            return <Text>{month}</Text>
    };

    function ChangeShowMode() {
        if (showMode == "Mês")
            setShowMode("Semana");
        else
            setShowMode("Mês");
    };

    return (
        <View style={[styles.container, { backgroundColor: "#FFF7D4" }]}>
            <View style={styles.headerlayer}>
                <View style={styles.viewbloco}>
                    <TouchableOpacity style={[styles.block, { backgroundColor: "#C07F00" }]} onPress={ChangeShowMode}>
                        <Text style={{ color: "#FFF7D4", fontSize: 15, fontWeight: "bold" }}>
                            {showMode}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewlogo}>
                    <Image
                        style={styles.logo}
                        source={require('../../../../assets/Logo.png')}
                    />
                </View>
                <View style={styles.viewreload}>
                    <ReloadIcon style={styles.reload} width={20} height={20} />
                </View>
            </View>
            <View style={styles.sincronizedlayer}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Sincronizado em: 15:39 - {day}.{MonthAjusted()}.{year}
                </Text>
            </View>
            <View style={styles.cardslayer}>
                <CardDashboard
                    cardType={1}
                    color='#FFD95A'
                    textColor='#000000'
                />
                <CardDashboard
                    cardType={2}
                    color='#C07F00'
                    textColor='#000000'
                />
                <CardDashboard
                    cardType={3}
                    color='#FFD95A'
                    textColor='#000000'
                />
                <CardDashboard
                    cardType={4}
                    color='#C07F00'
                    textColor='#000000'
                />
                <CardDashboard
                    cardType={5}
                    color='#FFD95A'
                    textColor='#000000'
                />
            </View>
            {/* <FooterMenu 
            actual={2}
            leftPage={"ClockIn"}
            centerPage={"Dashboard"}
            rightPage={"Perfil"}
            /> */}
        </View >
    )
}
export default Dashboard;