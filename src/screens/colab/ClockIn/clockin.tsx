import { Text, View, Image, TouchableNativeFeedback, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from 'react-native-switch';
import * as Progress from 'react-native-progress';
import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import styles from "./styles";
import CardPonto from "../../../components/CardPonto/CardPonto";
import CalendarIcon from '../../../../assets/svg/calendar.svg';
import ListIcon from '../../../../assets/svg/lista.svg';
import CafeIcon from '../../../../assets/svg/coffee.svg';
import MaletaIcon from '../../../../assets/svg/maleta.svg';
import ClimbingIcon from '../../../../assets/svg/homem_subindo_escadas.svg';
import Calendar from "../../../components/Calendar/Calendar";
import FingerprintIcon from '../../../../assets/svg/fingerprint.svg';
import PinIcon from '../../../../assets/svg/pin.svg';



function ClockIn() {
    const [progressBarAtived, setProgressBarAtived] = useState(true);
    const [dailyJourneyAtived, setDailyJourneyAtived] = useState(true);
    const [interval_Atived, setInterval_Atived] = useState(true);
    const [interval_blocked, setInterval_blocked] = useState(false);

    const [valueIgnored, setValueIgnored] = useState(false);
    const [dayWeek, setDayWeek] = useState("");
    // const [day, setDay] = useState(23);
    // const [month, setMonth] = useState(5);
    // const [year, setYear] = useState(2023);
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalPontoVisible, setModalPontoVisible] = useState(false);

    const [entradaplanned, setEntradaplanned] = useState("");
    const [intervalInicioplanned, setIntervalInicioplanned] = useState("");
    const [intervalFimplanned, setIntervalFimplanned] = useState("");
    const [saidaplanned, setSaidaplanned] = useState("");

    const [entradaReal, setEntradaReal] = useState("");
    const [intervaloInicioReal, setintervaloInicioReal] = useState("");
    const [intervaloFimReal, setintervaloFimReal] = useState("");
    const [saidaReal, setSaidaReal] = useState("");

    const [tempoTotal, setTempoTotal] = useState("");
    const [horaTotal, setHoraTotal] = useState('');
    const [minTotal, setMinTotal] = useState('');


    const date = new Date();

    const yearCurrent = date.getFullYear();
    const monthCurrent = String(date.getMonth() + 1).padStart(2, '0');
    const dayCurrent = String(date.getDate()).padStart(2, '0');
    const dayWeekCurrent = date.getDay();

    const currentDate = `${dayCurrent}-${monthCurrent}-${yearCurrent}`;

    const getCurrentTime = () => {
        const date = new Date();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${hour}h${minute}`;
    };

    function getDayWeek() {
        if (dayWeekCurrent == 0)
            setDayWeek('Domingo');
        if (dayWeekCurrent == 1)
            setDayWeek('Segunda');
        if (dayWeekCurrent == 2)
            setDayWeek('Terça');
        if (dayWeekCurrent == 3)
            setDayWeek('Quarta');
        if (dayWeekCurrent == 4)
            setDayWeek('Quinta');
        if (dayWeekCurrent == 5)
            setDayWeek('Sexta');
        if (dayWeekCurrent == 6)
            setDayWeek('Sábado');
    }

    // useEffect(() => {
    //     getMyLocation()
    // }, [])

    // function getMyLocation() {
    //     Geolocation.getCurrentPosition(info => {
    //         console.log('LAT ', info.coords.latitude)
    //         console.log('LON ', info.coords.longitude)
    //     })
    // }

    useEffect(() => {
        getDayWeek();
        handleRequisition();
        checkIntervalIsOpen();
        tempoTotalSlicer();
    }, []);

    const handleRequisition = async () => {
        const apiUrl = 'https://b3af-2804-d4b-7aa4-c00-cb4a-606b-3371-afdb.ngrok-free.app/collaborator/point_presences' + '?data=' + currentDate;//'25-06-2023';
        console.log(apiUrl)

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            console.log(currentDate)
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setEntradaplanned(data[0].tempo_inicial.padrao);
                setIntervalInicioplanned(data[0].intervalo_inicial.padrao);//data[0].intervalo_inicial.padrao
                setIntervalFimplanned(data[0].intervalo_final.padrao);//data[0].intervalo_final.padrao
                setSaidaplanned(data[0].tempo_final.padrao);
                console.log('entrada planejada:' + entradaplanned);
                console.log('intervalo ini planejada:' + intervalInicioplanned);
                console.log('intervalo fim planejada:' + intervalFimplanned);
                console.log('saida planejada:' + saidaplanned);

                setEntradaReal(data[0].tempo_inicial.real);
                setintervaloInicioReal('');//data[0].intervalo_inicial.real
                setintervaloFimReal('');//data[0].intervalo_final.real
                setSaidaReal(data[0].tempo_final.real);
                console.log('entrada real:' + entradaReal);
                console.log('intervalo ini real:' + intervaloInicioReal);
                console.log('intervalo fim real:' + intervaloFimReal);
                console.log('saida real:' + saidaReal);

                setTempoTotal(data[0].tempo_total);
                console.log('tempo total:' + tempoTotal);

            } else {
                console.log('Solicitacao falhou');
            }
        } catch (error) {
            // Lidar com erros de rede ou da API
            console.log('Ocorreu um erro:', error);
        }
    };

    const handleBaterPontoPress = () => {
        setModalPontoVisible(true);
    };

    function checkIntervalIsOpen() {
        if (intervalInicioplanned == '' && intervalFimplanned == '') { //não tem intervalo
            setInterval_Atived(false);
            setInterval_blocked(true);
        }
        else {
            setInterval_Atived(true);
            setInterval_blocked(false);
        }
    }

    function tempoTotalSlicer() {
        setHoraTotal(tempoTotal.slice(0, 2));
        setMinTotal(tempoTotal.slice(3, 5));
        if (horaTotal == '')
            setHoraTotal('0');
        if (minTotal == '')
            setMinTotal('0');
    }

    function DailyJourneyActivated() {
        if (dailyJourneyAtived == true) {
            return (
                <View style={styles.optional1}>
                    <CafeIcon style={styles.cafeicon} width={70} height={70} color={'#C07F00'} />
                    <Text style={styles.textJourney}>Jornada Diária de Trabalho</Text>
                    <View style={[styles.horaminBlock, { backgroundColor: '#FFD95A' }]}>
                        <Text style={styles.textHoraMin}>
                            {horaTotal} Horas
                        </Text>
                        <View style={[styles.headerDivider, { width: '100%' }]} />
                        <Text style={styles.textHoraMin}>
                            {minTotal} Minutos
                        </Text>
                    </View>
                </View>
            )
        }
    }

    function ProgressBarActivated() {
        if (dailyJourneyAtived == true) {
            return (
                <View style={styles.optional2}>
                    <MaletaIcon style={styles.cafeicon} width={40} height={40} color={"#4C3D3D"} />
                    <Progress.Bar progress={0.8} width={200} color='#C07F00' unfilledColor='#4C3D3D' />
                    <ClimbingIcon style={styles.cafeicon} width={40} height={40} color={"#C07F00"} />
                </View>
            )
        }
    }

    const handleDatePress = (date: number) => {
        console.log('Data clicada:', date);
    };

    const handleCloseModal = () => {
        setVisibleModal(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerlayer}>
                <View>
                    <ListIcon width={30} height={30} />
                </View>
                <View style={styles.header}>
                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#C07F00" }}>HOJE</Text>
                    <View style={styles.headerDivider} />
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{dayWeek}, {currentDate}</Text>
                </View>
                <TouchableOpacity onPress={() => setVisibleModal(true)}>
                    <CalendarIcon width={30} height={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.cardslayer}>
                <CardPonto
                    cardType={1}
                    ponto={entradaReal}
                    color='#FFD95A'
                    textColor='black'
                    clockin={false}
                    planned={entradaplanned}
                    intervalAtived={true}
                    onBaterPontoPress={handleBaterPontoPress}
                />
                <CardPonto
                    cardType={2}
                    ponto={intervaloInicioReal}
                    color='#FFF7D4'
                    textColor='black'
                    clockin={false}
                    intervalAtived={interval_Atived}
                    onBaterPontoPress={handleBaterPontoPress}
                />
                <CardPonto
                    cardType={3}
                    ponto={intervaloFimReal}
                    color='#FFD95A'
                    textColor='black'
                    clockin={false}
                    intervalAtived={interval_Atived}
                    onBaterPontoPress={handleBaterPontoPress}
                />
                <CardPonto
                    cardType={4}
                    ponto={saidaReal}
                    color='#FFF7D4'
                    textColor='black'
                    clockin={false}
                    planned={saidaplanned}
                    intervalAtived={true}
                    onBaterPontoPress={handleBaterPontoPress}
                />
            </View>
            <View style={styles.switchlayer}>
                <Text style={styles.interval}>Intervalo?</Text>
                <Switch
                    value={interval_Atived}
                    onValueChange={interval_blocked == false ? setInterval_Atived : setValueIgnored}
                    disabled={false}
                    // activeText={'On'}
                    // inActiveText={'Off'}
                    circleSize={30}
                    barHeight={30}
                    circleBorderWidth={3}
                    backgroundActive={'#C07F00'}
                    backgroundInactive={'#83908D'}
                    circleActiveColor={'#4C3D3D'}
                    circleInActiveColor={'#4C3D3D'}
                    changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                    outerCircleStyle={{}} // style for outer animated circle
                    renderActiveText={false}
                    renderInActiveText={false}
                    switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                    switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                    switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                    switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                />
            </View>
            <View style={styles.statuslayer}>
                {DailyJourneyActivated()}
                {ProgressBarActivated()}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModal}
                onRequestClose={handleCloseModal}
            >
                <View style={[styles.modalMask, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <View style={[styles.modalCalendarContent, { backgroundColor: '#FFFFFF' }]}>
                        <Text style={[styles.titleModal, { color: '#C07F00' }]}>Espelho de Ponto</Text>
                        <Calendar onDatePress={handleDatePress} />
                        <MapView
                            style={styles.map1}
                            initialRegion={{
                                // -3.824426321813534, -38.48832181744508
                                latitude: -3.824426321813534,
                                longitude: -38.48832181744508,
                                latitudeDelta: 0.0022,
                                longitudeDelta: 0.0021,
                            }}

                        >
                            <Marker
                                coordinate={{ latitude: -3.824426321813534, longitude: -38.48832181744508 }}
                            />
                            <Circle
                                center={{ latitude: -3.824426321813534, longitude: -38.48832181744508 }}
                                radius={80}
                            />
                        </MapView>
                        <Text>Rua Muniz Freire, 128, Messejana, Brasil</Text>
                        <Text>Período de Trabalho</Text>
                        <Text>Intervalo</Text>
                        {/* <TouchableOpacity onPress={handleCloseModal} style={{ marginTop: 0 }}>
                            <Text style={{ color: '#C07F00', textAlign: 'center' }}>Fechar</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setVisibleModal(false)}
                        >
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPontoVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={[styles.modalMask, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <View style={[styles.modalPontoContent, { backgroundColor: '#000000' }]}>
                        <Text style={[styles.topLeftText, { color: '#C07F00' }]}>Você está:</Text>
                        <Text style={[styles.topRightText, { color: '#C07F00' }]}>{getCurrentTime()}</Text>
                        <MapView
                            style={styles.map2}
                            initialRegion={{
                                // -3.824426321813534, -38.48832181744508
                                latitude: -3.824426321813534,
                                longitude: -38.48832181744508,
                                latitudeDelta: 0.0022,
                                longitudeDelta: 0.0021,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: -3.824426321813534, longitude: -38.48832181744508 }}
                            />
                            <Circle
                                center={{ latitude: -3.824426321813534, longitude: -38.48832181744508 }}
                                radius={80}
                            />
                        </MapView>
                        <Text style={styles.addressText}>123 Main St, City</Text>
                        <View style={styles.pin}>
                            <PinIcon width={30} height={30} color='#C07F00' />
                        </View>
                        <View style={[styles.fingerprint, { borderColor: '#C07F00' }]}>
                            <FingerprintIcon width={50} height={50} color='#C07F00' />
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalPontoVisible(false)}
                        >
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default ClockIn;