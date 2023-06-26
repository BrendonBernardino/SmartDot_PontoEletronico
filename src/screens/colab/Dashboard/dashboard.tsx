import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import CardDashboard from "../../../components/CardDashboard/CardDashboard";
import ReloadIcon from '../../../../assets/svg/reload.svg';

function Dashboard() {
    const [day, setDay] = useState(23);
    const [month, setMonth] = useState(5);
    const [year, setYear] = useState(2023);
    const [showMode, setShowMode] = useState("Mês");

    const [bancoHora, setBancoHora] = useState('');
    const [totalHorasWorked, setTotalHorasWorked] = useState(0);
    const [totalFaltas, setTotalFaltas] = useState(0);
    const [syncTime, setSyncTime] = useState('');

    const getCurrentTime = () => {
        const date = new Date();
        const yearCurrent = date.getFullYear();
        const monthCurrent = String(date.getMonth() + 1).padStart(2, '0');
        const dayCurrent = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        return `${hour}:${minute} - ${dayCurrent}.${monthCurrent}.${yearCurrent}`;
    };

    const handleRequisition = async () => {
        const apiUrl = 'https://b3af-2804-d4b-7aa4-c00-cb4a-606b-3371-afdb.ngrok-free.app/collaborator/dashboards';
        console.log(apiUrl)

        setSyncTime(getCurrentTime());

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setBancoHora(data.banco_de_hora);
                setTotalHorasWorked(data.total_horas_trabalhadas);
                setTotalFaltas(data.total_de_faltas);

            } else {
                console.log('Solicitacao falhou');
            }
        } catch (error) {
            // Lidar com erros de rede ou da API
            console.log('Ocorreu um erro:', error);
        }
    };

    useEffect(() => {
        handleRequisition();
        setSyncTime(getCurrentTime());
    }, []);

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
                    {/* <TouchableOpacity style={[styles.block, { backgroundColor: "#C07F00" }]} onPress={ChangeShowMode}>
                        <Text style={{ color: "#FFF7D4", fontSize: 15, fontWeight: "bold" }}>
                            {showMode}
                        </Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.viewlogo}>
                    <Image
                        style={styles.logo}
                        source={require('../../../../assets/Logosvg_1.png')}
                    />
                </View>
                <TouchableOpacity style={styles.viewreload} onPress={handleRequisition}>
                    <ReloadIcon style={styles.reload} width={20} height={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.sincronizedlayer}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Sincronizado em: {syncTime}
                </Text>
            </View>
            <View style={styles.cardslayer}>
                <CardDashboard
                    cardType={1}
                    color='#FFD95A'
                    textColor='#000000'
                    value={bancoHora}
                />
                <CardDashboard
                    cardType={2}
                    color='#C07F00'
                    textColor='#000000'
                    value={totalHorasWorked}
                />
                {/* <CardDashboard
                    cardType={3}
                    color='#FFD95A'
                    textColor='#000000'
                    value={}
                />
                <CardDashboard
                    cardType={4}
                    color='#C07F00'
                    textColor='#000000'
                    value={}
                /> */}
                <CardDashboard
                    cardType={5}
                    color='#FFD95A'
                    textColor='#000000'
                    value={totalFaltas}
                />
            </View>
        </View >
    )
}
export default Dashboard;