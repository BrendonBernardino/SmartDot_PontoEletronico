import { Text, View, PermissionsAndroid, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from 'expo-checkbox';
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
import RelaxIcon from '../../../../assets/svg/relax.svg';
import Toast from 'react-native-toast-message'
import Loading from '../../../components/Loading/Loading';

// import { RSA } from 'react-native-rsa-native';
// import DeviceInfo from 'react-native-device-info';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';
import ENV from '../../../../env';

const apiUrl = ENV.API_URL;


function ClockIn() {
    const [progressBarAtived, setProgressBarAtived] = useState(true);
    const [dailyJourneyAtived, setDailyJourneyAtived] = useState(true);
    const [interval_Atived, setInterval_Atived] = useState(false);
    const [interval_blocked, setInterval_blocked] = useState(false);

    const [valueIgnored, setValueIgnored] = useState(false);
    const [dayWeek, setDayWeek] = useState("");

    const [visibleModal, setVisibleModal] = useState(false);
    const [modalPontoVisible, setModalPontoVisible] = useState(false);
    const [visibleModalList, setVisibleModalList] = useState(false);

    const [noWorkDays, setNoWorkDays] = useState(false);
    const [entradaplanned, setEntradaplanned] = useState("");
    const [intervalInicioplanned, setIntervalInicioplanned] = useState("");
    const [intervalFimplanned, setIntervalFimplanned] = useState("");
    const [saidaplanned, setSaidaplanned] = useState("");
    const [entradaReal, setEntradaReal] = useState("");
    const [intervaloInicioReal, setintervaloInicioReal] = useState("");
    const [intervaloFimReal, setintervaloFimReal] = useState("");
    const [saidaReal, setSaidaReal] = useState("");

    const [entradaRealHistory, setEntradaRealHistory] = useState("");
    const [intervaloInicioRealHistory, setintervaloInicioRealHistory] = useState("");
    const [intervaloFimRealHistory, setintervaloFimRealHistory] = useState("");
    const [saidaRealHistory, setSaidaRealHistory] = useState("");
    const [myLatitudeHistory, setMyLatitudeHistory] = useState(0);
    const [myLongitudeHistory, setMyLongitudeHistory] = useState(0);

    const [tempoTotal, setTempoTotal] = useState("");
    const [horaTotal, setHoraTotal] = useState('');
    const [minTotal, setMinTotal] = useState('');
    const [progressNumber, setProgressNumber] = useState(0.0);

    const [cardPontoType, setCardPontoType] = useState(0);

    const [myLatitude, setMyLatitude] = useState(0);
    const [myLongitude, setMyLongitude] = useState(0);
    const [location, setLocation] = useState(null);
    const [streetName, setStreetName] = useState("");
    const apiKey = 'AIzaSyAdt_pKKCXJSEQKbiosdO_F26gtonhpROI';

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [scheduleTime, setScheduleTime] = useState("");
    const [timePOST, setTimePOST] = useState("");
    const [latitudeString, setLatitudeString] = useState("");
    const [longitudeString, setLongitudeString] = useState("");
    const [authID, setAuthID] = useState("");

    const date = new Date();
    const yearCurrent = date.getFullYear();
    const monthCurrent = String(date.getMonth() + 1).padStart(2, '0');
    const dayCurrent = String(date.getDate()).padStart(2, '0');
    const dayWeekCurrent = date.getDay();
    const currentDate = `${dayCurrent}-${monthCurrent}-${yearCurrent}`;

    const getCurrentTime = () => {
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${hour}:${minute}`;
    };

    const getCurrentLocation = () => {
        setIsLoading(true);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: 'Permissão para acessar a localização foi negada.'
                })
                setIsLoading(false);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            Toast.show({
                type: 'success',
                text1: 'Geolocalização obtida!'
            })
            setIsLoading(false);
            setLocation(location);
            console.log(JSON.stringify(location));
            setMyLatitude(location.coords.latitude != null ? location.coords.latitude : 0);
            setMyLongitude(location.coords.longitude != null ? location.coords.longitude : 0);
        })();
    }

    const searchStreetName = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${myLatitude},${myLongitude}&key=${apiKey}`
            );

            const data = await response.json();
            // console.log(data);
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                const street = result.formatted_address;
                setStreetName(street);
                console.log(street);
            }
        } catch (error) {
            console.log('Error occurred while searching for street name:', error);
        }
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

    useEffect(() => {
        getDayWeek();
        getCurrentLocation();
        handleRequisition();
    }, []);

    useEffect(() => {
        if (tempoTotal == '' || tempoTotal == undefined) {
            setHoraTotal('0');
            setMinTotal('0');
        }
        else {
            setHoraTotal(tempoTotal.substring(0, 2) == '00' ? '0' : tempoTotal.substring(0, 2));
            setMinTotal(tempoTotal.substring(3, 5) == '00' ? '0' : tempoTotal.substring(3, 5));
        }
        convertProgressBar();
    }, [tempoTotal]);

    useEffect(() => {
        if (intervalInicioplanned == '') {
            setInterval_Atived(false);
            setInterval_blocked(true);
        }
        else {
            setInterval_Atived(true);
            setInterval_blocked(false);
        }
        console.log('interval_Atived: ' + interval_Atived);
    }, [intervalInicioplanned]);

    useEffect(() => {
        if (timePOST == 'start_time' || timePOST == 'initial_interval' || timePOST == 'final_interval' || timePOST == 'final_time') {
            handleClockIn();
        }
    }, [timePOST]);

    async function handleAuthentication() {
        const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!isBiometricEnrolled) {
            return Toast.show({
                type: 'error',
                text1: 'Nenhuma biometria encontrada. Cadastre uma.'
            })
        }

        const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Bater Ponto com Biometria',
            fallbackLabel: 'Biometria não reconhecida',
        });
        if (auth.success) {
            const deviceId = Device.modelName;
            let deviceNameId = Device.deviceName;
            deviceNameId = deviceNameId == null ? '' : deviceNameId;
            console.log('model:' + deviceId + ' nameDevice:' + deviceNameId);
            setAuthID('model:' + deviceId + ' nameDevice:' + deviceNameId);
            setIsAuthenticated(true);
            // handleClockIn();
            if (cardPontoType == 1) {
                setTimePOST('start_time');
            }
            if (cardPontoType == 2) {
                setTimePOST('initial_interval');
            }
            if (cardPontoType == 3) {
                setTimePOST('final_interval');
            }
            if (cardPontoType == 4) {
                setTimePOST('final_time');
            }
            console.log('timePOST: ' + timePOST);
        }
        else {
            setIsAuthenticated(false);
        }
    }

    const handleClockIn = async () => {
        // PontoPush();
        console.log('timePOST: ' + timePOST);
        console.log('latitudeString: ' + latitudeString);
        console.log('longitudeString: ' + longitudeString);
        console.log('streetName: ' + streetName);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/collaborator/point_presences`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    schedule_time: timePOST,
                    latitude: latitudeString,
                    longitude: longitudeString,
                    local_name: streetName,
                    authentication_id: authID
                }),
            });

            console.log('Ponto Batido');

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Ponto Batido!'
                })

                if (cardPontoType == 1) {
                    setEntradaReal(scheduleTime);
                    console.log('Entrada: ');
                    console.log(entradaReal);
                    setIsAuthenticated(false);
                }
                if (cardPontoType == 2) {
                    setintervaloInicioReal(scheduleTime);
                    console.log('Intervalo Inicio: ');
                    console.log(intervaloInicioReal);
                    setIsAuthenticated(false);
                }
                if (cardPontoType == 3) {
                    setintervaloFimReal(scheduleTime);
                    console.log('Intervalo Fim: ');
                    console.log(intervaloFimReal);
                    setIsAuthenticated(false);
                }
                if (cardPontoType == 4) {
                    setSaidaReal(scheduleTime);
                    console.log('Saida: ');
                    console.log(saidaReal);
                    setIsAuthenticated(false);
                }
            } else {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errors;
                console.log(errorMessage);

                Toast.show({
                    type: 'error',
                    text1: 'Não foi possível bater o ponto.'
                })
            }

        } catch (error) {
            console.log(String(error));
            Toast.show({
                type: 'error',
                text1: 'Ocorreu um erro. Tente novamente.'
            });
        }
    };

    const handleRequisition = async () => {
        setIsLoading(true);
        const url = `${apiUrl}/collaborator/point_presences` + '?data=' + currentDate;

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(currentDate)
            if (response.ok) {
                const data = await response.json();
                Toast.show({
                    type: 'success',
                    text1: 'Seja Bem-Vindo Colaborador!'
                })
                console.log('requisição tela clockIN:');
                console.log(data);
                if (data == null) {
                    setNoWorkDays(true);
                }
                else {
                    setEntradaplanned(data[0].tempo_inicial.padrao);
                    if ((data[0].intervalo_inicial.padrao == '') || (data[0].intervalo_inicial.padrao == '0:0')) {
                        setIntervalInicioplanned('');
                    }
                    else {
                        setIntervalInicioplanned(data[0].intervalo_inicial.padrao);
                    }
                    setIntervalFimplanned(data[0].intervalo_final.padrao);
                    setSaidaplanned(data[0].tempo_final.padrao);


                    setEntradaReal(data[0].tempo_inicial.real);
                    setintervaloInicioReal(data[0].intervalo_inicial.real);
                    setintervaloFimReal(data[0].intervalo_final.real);
                    setSaidaReal(data[0].tempo_final.real);


                    setTempoTotal(data[0].tempo_total);

                    setProgressNumber(parseInt(tempoTotal != '' ? tempoTotal : '0') / ((parseInt(saidaplanned != '' ? saidaplanned : '0') - parseInt(entradaplanned != '' ? entradaplanned : '0'))) - ((parseInt(intervalFimplanned != '' ? intervalFimplanned : '0') - parseInt(intervalInicioplanned != '' ? intervalInicioplanned : '0'))))
                    console.log('progress: ' + progressNumber);

                    setNoWorkDays(false);
                }
                setIsLoading(false);
            } else {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errors;

                Toast.show({
                    type: 'error',
                    // text1: errorMessage || 'Não foi possível recarregar'
                    text1: 'erro requisição'
                })
                setIsLoading(false);
            }
        } catch (error) {
            // Lidar com erros de rede ou da API
            console.log('Ocorreu um erro:', error);
            Toast.show({
                type: 'error',
                text1: 'Falha na solicitação da API.'
            })
            setIsLoading(false);
        }
    };

    const fetchData = async (date: string, name?: string) => {
        try {
            setIsLoading(true);
            let url = `${apiUrl}/collaborator/point_presences?data=${date}`;

            const token = await AsyncStorage.getItem('token');

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errors;

                Toast.show({
                    type: 'error',
                    text1: errorMessage || 'Não foi possível recarregar'
                })
            }

            const data = await response.json();
            //   setJsonData(data);
            //   setData(date);
            setEntradaRealHistory(data[0].tempo_inicial.real);
            setintervaloInicioRealHistory(data[0].intervalo_inicial.real);
            setintervaloFimRealHistory(data[0].intervalo_final.real);
            setSaidaRealHistory(data[0].tempo_final.real);

            setMyLatitudeHistory(parseFloat(data[0].tempo_final.latitude));
            setMyLongitudeHistory(parseFloat(data[0].tempo_final.longitude));
            console.log(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: String(error)
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBaterPontoPress = (index: number) => {
        setModalPontoVisible(true);
        setCardPontoType(index);
        console.log(myLatitude);
        console.log(myLongitude);
        setLatitudeString(myLatitude.toString());
        setLongitudeString(myLongitude.toString());
        setScheduleTime(getCurrentTime);
        searchStreetName();
    };

    const handlePontoAuth = () => {
        setModalPontoVisible(false);
        handleAuthentication();
    }

    function checkIntervalIsOpen() {
        if (intervalInicioplanned == '') { //não tem intervalo
            setInterval_Atived(false);
            setInterval_blocked(true);
        }
        else {
            setInterval_Atived(true);
            setInterval_blocked(false);
        }
        console.log('interval_Atived: ' + interval_Atived);
    }

    function convertProgressBar() {
        const jornadaAtual = parseInt(tempoTotal != '' ? tempoTotal : '0');
        console.log(jornadaAtual);
        const jornadaTotal = ((parseInt(saidaplanned != '' ? saidaplanned : '0') - parseInt(entradaplanned != '' ? entradaplanned : '0'))) - ((parseInt(intervalFimplanned != '' ? intervalFimplanned : '0') - parseInt(intervalInicioplanned != '' ? intervalInicioplanned : '0')));
        console.log(jornadaTotal);
        const progress = tempoTotal != '' ? jornadaAtual / jornadaTotal : '';
        console.log(progress);
        if (progress > 1) {
            setProgressNumber(1);
        }
        if (progress < 0 || progress == null || progress == undefined) {
            setProgressNumber(0);
        }
        if (progress >= 0 && progress <= 1) {
            setProgressNumber(progress);
        }
        else {
            setProgressNumber(0);
        }
        console.log('progress: ' + progressNumber);
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
        if (progressBarAtived == true) {
            return (
                <View style={styles.optional2}>
                    <MaletaIcon style={styles.cafeicon} width={40} height={40} color={"#4C3D3D"} />
                    <Progress.Bar progress={0.1} width={200} color='#C07F00' unfilledColor='#4C3D3D' />
                    <ClimbingIcon style={styles.cafeicon} width={40} height={40} color={"#C07F00"} />
                </View>
            )
        }
    }

    function switchAvailable() {
        if (interval_blocked == false) {
            return (
                <View style={styles.switchlayer}>
                    <Text style={styles.interval}>Intervalo?</Text>
                    <Switch
                        value={interval_Atived}
                        onValueChange={interval_blocked == false ? setInterval_Atived : setValueIgnored}
                        disabled={false}
                        circleSize={30}
                        barHeight={30}
                        circleBorderWidth={3}
                        backgroundActive={'#C07F00'}
                        backgroundInactive={'#83908D'}
                        circleActiveColor={'#4C3D3D'}
                        circleInActiveColor={'#4C3D3D'}
                        changeValueImmediately={true}
                        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                        outerCircleStyle={{}}
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchLeftPx={2}
                        switchRightPx={2}
                        switchWidthMultiplier={2}
                        switchBorderRadius={30}
                    />
                </View>
            )
        }
    }

    const verifyWorkingDays = () => {
        if (noWorkDays == true) {
            return (
                <View style={styles.restlayer}>
                    <RelaxIcon width={30} height={30} color='#C07F00' />
                    <Text>Sem trabalho por hoje! Aproveite para descansar.</Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.worklayer}>
                    <View style={styles.cardslayer}>
                        <CardPonto
                            cardType={1}
                            ponto={entradaReal}
                            color='#FFD95A'
                            textColor='black'
                            clockin={false}
                            planned={entradaplanned}
                            intervalAtived={true}
                            onBaterPontoPress={() => handleBaterPontoPress(1)}
                        />
                        <CardPonto
                            cardType={2}
                            ponto={intervaloInicioReal}
                            color='#FFF7D4'
                            textColor='black'
                            clockin={false}
                            planned={intervalInicioplanned}
                            intervalAtived={interval_Atived == true ? true : false}
                            onBaterPontoPress={() => handleBaterPontoPress(2)}
                        />
                        <CardPonto
                            cardType={3}
                            ponto={intervaloFimReal}
                            color='#FFD95A'
                            textColor='black'
                            clockin={false}
                            planned={intervalFimplanned}
                            intervalAtived={interval_Atived == true ? true : false}
                            onBaterPontoPress={() => handleBaterPontoPress(3)}
                        />
                        <CardPonto
                            cardType={4}
                            ponto={saidaReal}
                            color='#FFF7D4'
                            textColor='black'
                            clockin={false}
                            planned={saidaplanned}
                            intervalAtived={true}
                            onBaterPontoPress={() => handleBaterPontoPress(4)}
                        />
                    </View>
                    {switchAvailable()}
                    <View style={styles.statuslayer}>
                        {DailyJourneyActivated()}
                        {ProgressBarActivated()}
                    </View>
                </View>
            )
        }
    }

    const handleDatePress = (date: any) => {
        console.log('Data clicada:', date);
        const { day, month, year } = date;
        const formattedDate = `${day}-${month + 1}-${year}`;
        fetchData(formattedDate);
        // formatDate(formattedDate);
    };

    const handleCloseModal = () => {
        setVisibleModal(false);
    };

    const handleCloseModalList = () => {
        setVisibleModalList(false);
    };

    return isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF7D4' }}>
            <Loading />
        </View>
    ) : (
        <View style={styles.container}>
            <View style={styles.headerlayer}>
                <TouchableOpacity onPress={() => setVisibleModalList(true)}>
                    <ListIcon width={30} height={30} />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#C07F00" }}>HOJE</Text>
                    <View style={styles.headerDivider} />
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{dayWeek}, {currentDate}</Text>
                </View>
                <TouchableOpacity onPress={() => setVisibleModal(true)}>
                    <CalendarIcon width={30} height={30} />
                </TouchableOpacity>
            </View>
            {verifyWorkingDays()}
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
                                latitude: myLatitudeHistory == null ? -3.824426321813534 : myLatitudeHistory,
                                longitude: myLongitudeHistory == null ? -38.48832181744508 : myLongitudeHistory,
                                latitudeDelta: 0.0022,
                                longitudeDelta: 0.0021,
                            }}
                        >
                            <Marker coordinate={{ latitude: myLatitudeHistory, longitude: myLongitudeHistory }} pinColor='#C07F00' />
                            <Circle center={{ latitude: myLatitudeHistory, longitude: myLongitudeHistory }} radius={80} />
                        </MapView>
                        <View style={styles.bottomRowContainer}>
                            <Text style={styles.periodoTrabalhoText}>Período de Trabalho</Text>
                            <Text style={styles.intervaloText}>Intervalo</Text>
                        </View>
                        <View style={styles.bottomRowContainer}>
                            <Text style={styles.periodoTrabalhoText}>{entradaRealHistory} - {saidaRealHistory}</Text>
                            <Text style={styles.intervaloText}>{intervaloInicioRealHistory} - {intervaloFimRealHistory}</Text>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setVisibleModal(false)}>
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
                        <Text style={[styles.topLeftText2, { color: '#C07F00' }]}>Você está:</Text>
                        <Text style={[styles.topRightText2, { color: '#C07F00' }]}>{getCurrentTime()}</Text>
                        <MapView
                            style={styles.map2}
                            initialRegion={{
                                // -3.824426321813534, -38.48832181744508
                                //  -3.7448854253797106, -38.57811524276128
                                latitude: myLatitude,
                                longitude: myLongitude,
                                latitudeDelta: 0.0022,
                                longitudeDelta: 0.0021,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: myLatitude, longitude: myLongitude }}
                            />
                            {/* <Circle
                                center={{ latitude: myLatitude, longitude: myLongitude }}
                                radius={80}
                            /> */}
                        </MapView>
                        <Text style={[styles.addressText2, {color:'white'}]}>{streetName}</Text>
                        <View style={styles.pin}>
                            <PinIcon width={30} height={30} color='#C07F00' />
                        </View>
                        <TouchableOpacity style={[styles.fingerprint, { borderColor: '#C07F00' }]} onPress={handlePontoAuth}>
                            <FingerprintIcon width={50} height={50} color='#C07F00' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalPontoVisible(false)}
                        >
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModalList}
                onRequestClose={handleCloseModalList}
            >
                <View style={styles.modalListContainer}>
                    {/* <View style={styles.themeBar}>
                        <View style={[
                            styles.themeCard,
                            { backgroundColor:'' }
                        ]}>
                            <TouchableOpacity onPress={setLightMode}>
                                <Feather name="sun" size={25} style={{ color: themeMode === COLORSLIGHT ? themeMode.tertiary : themeMode.gray }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={setDarkMode}>
                                <Entypo name="moon" size={25} style={{ color: themeMode === COLORSLIGHT ? themeMode.gray_erased : themeMode.tertiary }} />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Exibir Barra de Progresso</Text>
                        <CheckBox
                            style={{ borderColor: "#FFD95A" }}
                            value={progressBarAtived}
                            onValueChange={setProgressBarAtived}
                            color={progressBarAtived ? '#FFD95A' : undefined}
                        />
                    </View>
                    <View style={styles.headerDivider} />
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Exibir Jornada Diária</Text>
                        <CheckBox
                            style={{ borderColor: "#C07F00" }}
                            value={dailyJourneyAtived}
                            onValueChange={setDailyJourneyAtived}
                            color={dailyJourneyAtived ? '#C07F00' : undefined}
                        />
                    </View>
                    <View style={styles.headerDivider} />
                    <TouchableOpacity
                        style={[styles.closeButton, { top: 90, right: 5 }]}
                        onPress={() => setVisibleModalList(false)}
                    >
                        <AntDesign name="close" size={24} color="#000000" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.circle} onPress={() => console.log('Circle clicked')}>
                            <View style={styles.circleInner} />
                        </TouchableOpacity> */}
                </View>
            </Modal>
        </View>
    )
}
export default ClockIn;