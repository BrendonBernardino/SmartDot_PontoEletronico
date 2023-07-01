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
import Toast from 'react-native-toast-message'

import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';



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
    const [visibleModalList, setVisibleModalList] = useState(false);

    const [entradaplanned, setEntradaplanned] = useState("");
    const [intervalInicioplanned, setIntervalInicioplanned] = useState("");
    const [intervalFimplanned, setIntervalFimplanned] = useState("");
    const [saidaplanned, setSaidaplanned] = useState("");

    const [entradaReal, setEntradaReal] = useState("");
    const [intervaloInicioReal, setintervaloInicioReal] = useState("");
    const [intervaloFimReal, setintervaloFimReal] = useState("");
    const [saidaReal, setSaidaReal] = useState("");

    const [scheduleTime, setScheduleTime] = useState("");

    const [tempoTotal, setTempoTotal] = useState("");
    const [horaTotal, setHoraTotal] = useState('');
    const [minTotal, setMinTotal] = useState('');

    const [cardPontoType, setCardPontoType] = useState(0);

    const [myLatitude, setMyLatitude] = useState(0);
    const [myLongitude, setMyLongitude] = useState(0);
    const [location, setLocation] = useState(null);
    const [streetName, setStreetName] = useState(null);
    const apiKey = 'AIzaSyAdt_pKKCXJSEQKbiosdO_F26gtonhpROI'; //Key do Google Maps

    const [isAuthenticated, setIsAuthenticated] = useState(false);


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
        return `${hour}:${minute}`;
    };

    const getCurrentLocation = () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // Toast.show({
                //     type: 'error',
                //     text1: 'Permissão para acessar a localização foi negada.'
                // })
                //   setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            // Toast.show({
            //     type: 'success',
            //     text1: 'Geolocalização obtida!'
            // })
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
            console.log(data);
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                const street = result.formatted_address;
                setStreetName(street);
                // console.log(street);
                console.log(streetName);
            }
        } catch (error) {
            console.log('Error occurred while searching for street name:', error);
        }
    };

    async function handleAuthentication() {
        console.log('========handleAuthentication========')
        setIsAuthenticated(false);
        const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!isBiometricEnrolled) {
            return Toast.show({
                type: 'error',
                text1: 'Nenhuma biometria encontrada. Cadastre uma.'
            })
        }
        console.log('isAuthenticated: '+isAuthenticated);
        const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Bater Ponto com Biometria',
            fallbackLabel: 'Biometria não reconhecida'
        });
        console.log(auth);
        setIsAuthenticated(auth.success);
        console.log('Autenticacao: '+auth.success);
        console.log('isAuthenticated: '+isAuthenticated);
        if(isAuthenticated == true) {
            clockIn();
        }
    }

    function showCardPontos() {
        return (
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
                    intervalAtived={interval_Atived}
                    onBaterPontoPress={() => handleBaterPontoPress(2)}
                />
                <CardPonto
                    cardType={3}
                    ponto={intervaloFimReal}
                    color='#FFD95A'
                    textColor='black'
                    clockin={false}
                    intervalAtived={interval_Atived}
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
        )
    }

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
        console.log('entrada planejada:' + entradaplanned);
        console.log('intervalo ini planejada:' + intervalInicioplanned);
        console.log('intervalo fim planejada:' + intervalFimplanned);
        console.log('saida planejada:' + saidaplanned);
        console.log('entrada real:' + entradaReal);
        console.log('intervalo ini real:' + intervaloInicioReal);
        console.log('intervalo fim real:' + intervaloFimReal);
        console.log('saida real:' + saidaReal);
        console.log('tempo total:' + tempoTotal);
        checkIntervalIsOpen();
        tempoTotalSlicer();
    }, []);

    useEffect(() => {
        if(isAuthenticated == true) {
            clockIn();
        }
        showCardPontos();
    }, [isAuthenticated, entradaReal, intervaloInicioReal, intervaloFimReal, saidaReal]);

    // useEffect(() => {
    //     handleUpdate();
    // }, [scheduleTime]);

    const handleRequisition = async () => {
        const apiUrl = 'https://07be-2804-d4b-7aa4-c00-777e-3364-c647-4e66.ngrok-free.app/collaborator/point_presences' + '?data=' + currentDate;//'25-06-2023';
        console.log(apiUrl)

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(apiUrl, {
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
                console.log(data);
                setEntradaplanned(data[0].tempo_inicial.padrao);
                setIntervalInicioplanned(data[0].intervalo_inicial.padrao);//data[0].intervalo_inicial.padrao
                setIntervalFimplanned(data[0].intervalo_final.padrao);//data[0].intervalo_final.padrao
                setSaidaplanned(data[0].tempo_final.padrao);


                setEntradaReal(data[0].tempo_inicial.real);
                setintervaloInicioReal('');//data[0].intervalo_inicial.real
                setintervaloFimReal('');//data[0].intervalo_final.real
                setSaidaReal(data[0].tempo_final.real);


                setTempoTotal(data[0].tempo_total);


            } else {
                console.log('Solicitacao falhou');
                Toast.show({
                    type: 'error',
                    text1: 'Não foi possível puxar suas informações da API. Desculpe o transtorno.'
                })
            }
        } catch (error) {
            // Lidar com erros de rede ou da API
            console.log('Ocorreu um erro:', error);
            Toast.show({
                type: 'error',
                text1: 'Falha na solicitação da API.'
            })
        }
    };

    const handleUpdate = async () => {
        console.log('scheduleTime: '+scheduleTime);
        const apiUrl = 'https://07be-2804-d4b-7aa4-c00-777e-3364-c647-4e66.ngrok-free.app/login'
        const credentials = {
            schedule_time: scheduleTime,
            latitude: myLatitude,
            longitude: myLongitude,
            local_name: streetName,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            console.log(scheduleTime)
            console.log(myLatitude)
            console.log(myLongitude)
            console.log(streetName)
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log(data.status);

                // Salvar o token no AsyncStorage
                await AsyncStorage.setItem('token', token);

                Toast.show({
                    type: 'success',
                    text1: 'Ponto cadastrado!'
                })

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao cadastrar ponto.'
                })
                console.log('Cadastro de Ponto falhou');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Não foi possível registrar seu ponto.'
            })
            // Lidar com erros de rede ou da API
            console.log('Ocorreu um erro:', error);
        }
    };

    const handleBaterPontoPress = (index: number) => {
        setModalPontoVisible(true);
        setCardPontoType(index);
        // getCurrentLocation();
        console.log(myLatitude);
        console.log(myLongitude);
        searchStreetName();
    };

    const handlePontoAuth = () => {
        console.log('========handlePontoAuth========')
        setModalPontoVisible(false);
        setIsAuthenticated(false);
        handleAuthentication();
        // console.log('cardPontoType: '+cardPontoType)
        // console.log('isAuthenticated: '+isAuthenticated)
    };

    function clockIn() {
        console.log('========clockIn========')
        if (cardPontoType == 1) {
            setEntradaReal(getCurrentTime);
            setScheduleTime(entradaReal);
            console.log('Entrada: ');
            console.log(entradaReal);
            setIsAuthenticated(false);
            console.log('isAuthenticated: '+isAuthenticated)
            // handleUpdate();
        }
        if (cardPontoType == 2) {
            setintervaloInicioReal(getCurrentTime);
            setScheduleTime(intervaloInicioReal);
            console.log('Intervalo Inicio: ');
            console.log(intervaloInicioReal);
            setIsAuthenticated(false);
            console.log('isAuthenticated: '+isAuthenticated)
            // handleUpdate();
        }
        if (cardPontoType == 3) {
            setintervaloFimReal(getCurrentTime);
            setScheduleTime(intervaloFimReal);
            console.log('Intervalo Fim: ');
            console.log(intervaloFimReal);
            setIsAuthenticated(false);
            console.log('isAuthenticated: '+isAuthenticated)
            // handleUpdate();
        }
        if (cardPontoType == 4) {
            setSaidaReal(getCurrentTime);
            setScheduleTime(saidaReal);
            console.log('Saida: ');
            console.log(saidaReal);
            setIsAuthenticated(false);
            console.log('isAuthenticated: '+isAuthenticated)
            // handleUpdate();
        }
    }

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
        if (progressBarAtived == true) {
            return (
                <View style={styles.optional2}>
                    <MaletaIcon style={styles.cafeicon} width={40} height={40} color={"#4C3D3D"} />
                    <Progress.Bar progress={0.8} width={200} color='#C07F00' unfilledColor='#4C3D3D' />
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
            )
        }
    }

    const handleDatePress = (date: number) => {
        console.log('Data clicada:', date);
    };

    const handleCloseModal = () => {
        setVisibleModal(false);
    };

    const handleCloseModalList = () => {
        setVisibleModalList(false);
    };

    return (
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
            {showCardPontos()}
            {switchAvailable()}
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
                                latitude: myLatitude,
                                longitude: myLongitude,
                                latitudeDelta: 0.0022,
                                longitudeDelta: 0.0021,
                            }}
                        >
                            <Marker coordinate={{ latitude: myLatitude, longitude: myLongitude }} />
                            <Circle center={{ latitude: myLatitude, longitude: myLongitude }} radius={80} />
                        </MapView>
                        {/* <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>Rua Muniz Freire, 128, Messejana, Brasil</Text>
                            <View style={styles.pin}>
                                <PinIcon width={30} height={30} color='#C07F00' />
                            </View>
                        </View>
                        <View style={styles.bottomRowContainer}>
                            <Text style={styles.periodoTrabalhoText}>Período de Trabalho</Text>
                            <Text style={styles.intervaloText}>Intervalo</Text>
                        </View> */}
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
                        <Text style={[styles.topLeftText, { color: '#C07F00' }]}>Você está:</Text>
                        <Text style={[styles.topRightText, { color: '#C07F00' }]}>{getCurrentTime()}</Text>
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
                            <Circle
                                center={{ latitude: myLatitude, longitude: myLongitude }}
                                radius={80}
                            />
                        </MapView>
                        <Text style={styles.addressText}>{streetName}</Text>
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