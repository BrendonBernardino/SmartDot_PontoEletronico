import { Text, View, Image } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Switch } from 'react-native-switch';
// import { Ionicons } from 'react-native-vector-icons'
// import { SelectList } from 'react-native-dropdown-select-list';
import styles from "./styles";
import CardPonto from "../../../components/CardPonto/CardPonto";
// import InputBlock from "../../../components/InputBlock/InputBlock";
import { StackTypes } from '../../../../App';
import CalendarIcon from '../../../../assets/svg/calendar.svg';
import ListIcon from '../../../../assets/svg/lista.svg';



function ClockIn() {
    const [progressBarAtived, setProgressBarAtived] = useState(true);
    const [dailyJourneyAtived, setDailyJourneyAtived] = useState(true);
    const [intervalAtived, setIntervalAtived] = useState(true);
    const [dayWeek, setDayWeek] = useState("Sexta");
    const [day, setDay] = useState(23);
    const [month, setMonth] = useState(5);
    const [year, setYear] = useState(2023);

    function MonthAjusted() {
        if(month < 10)
            return <Text>0{month}</Text>
        else
            return <Text>{month}</Text>
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerlayer}>
                <View>
                    <ListIcon width={30} height={30}/>
                </View>
                <View style={styles.header}>
                    <Text style={{fontWeight: "bold", fontSize: 25, color: "#C07F00"}}>HOJE</Text>
                    <View style={styles.headerDivider} />
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{dayWeek}, {day}.{MonthAjusted()}.{year}</Text>
                </View>
                <View>
                    <CalendarIcon width={30} height={30}/>
                </View>
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

            </View>

        </View>
    )
}
export default ClockIn;