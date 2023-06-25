import { Text, View, Image, TouchableNativeFeedback, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
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



function ClockIn() {
    const [progressBarAtived, setProgressBarAtived] = useState(true);
    const [dailyJourneyAtived, setDailyJourneyAtived] = useState(true);
    const [intervalAtived, setIntervalAtived] = useState(true);
    const [dayWeek, setDayWeek] = useState("Sexta");
    const [day, setDay] = useState(23);
    const [month, setMonth] = useState(5);
    const [year, setYear] = useState(2023);
    const [visibleModal, setVisibleModal] = useState(false);

    // useEffect(() => {
    //     getMyLocation()
    // }, [])

    // function getMyLocation() {
    //     Geolocation.getCurrentPosition(info => {
    //         console.log('LAT ', info.coords.latitude)
    //         console.log('LON ', info.coords.longitude)
    //     })
    // }

    function MonthAjusted() {
        if (month < 10)
            return <Text>0{month}</Text>
        else
            return <Text>{month}</Text>
    };

    function DailyJourneyActivated() {
        if (dailyJourneyAtived == true) {
            return (
                <View style={styles.optional1}>
                    <CafeIcon style={styles.cafeicon} width={70} height={70} color={'#C07F00'} />
                    <Text style={styles.textJourney}>Jornada Diária de Trabalho</Text>
                    <View style={[styles.horaminBlock, { backgroundColor: '#FFD95A' }]}>
                        <Text style={styles.textHoraMin}>
                            6 Horas
                        </Text>
                        <View style={[styles.headerDivider, { width: '100%' }]} />
                        <Text style={styles.textHoraMin}>
                            2 Minutos
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
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{dayWeek}, {day}.{MonthAjusted()}.{year}</Text>
                </View>
                <TouchableOpacity onPress={() => setVisibleModal(true)}>
                    <CalendarIcon width={30} height={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.cardslayer}>
                <CardPonto
                    cardType={1}
                    color='#FFD95A'
                    textColor='black'
                    clockin={false}
                    intervalAtived={true}
                    planned='12:00'
                />
                <CardPonto
                    cardType={2}
                    color='#FFF7D4'
                    textColor='black'
                    clockin={false}
                    intervalAtived={intervalAtived}
                />
                <CardPonto
                    cardType={3}
                    color='#FFD95A'
                    textColor='black'
                    clockin={false}
                    intervalAtived={intervalAtived}
                />
                <CardPonto
                    cardType={4}
                    color='#FFF7D4'
                    textColor='black'
                    clockin={false}
                    intervalAtived={true}
                    planned='18:00'
                />
            </View>
            <View style={styles.switchlayer}>
                <Text style={styles.interval}>Intervalo?</Text>
                <Switch
                    value={intervalAtived}
                    onValueChange={setIntervalAtived}
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
            {/* <Modal
                visible={visibleModal}
                transparent={true}
                onRequestClose={() => setVisibleModal(false)}
            >

            </Modal> */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModal}
                onRequestClose={handleCloseModal}
            >
                <View style={[styles.modalMask, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} onPress={handleCloseModal}>
                    <View style={[styles.modalCalendar, { backgroundColor: '#FFFFFF' }]}>
                        <Text style={[styles.titleModal, { color: '#C07F00' }]}>Espelho de Ponto</Text>
                        <Calendar onDatePress={handleDatePress} />
                        <MapView
                            style={styles.map}
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
                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default ClockIn;