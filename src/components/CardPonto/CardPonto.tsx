import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles"
import { StackTypes } from '../../../App';
import EntradaIcon from '../../../assets/svg/entrada.svg';
import IntervaloBeginIcon from '../../../assets/svg/intervaloInit.svg';
import IntervaloEndIcon from '../../../assets/svg/intervalofim.svg';
import SaidaIcon from '../../../assets/svg/saida.svg';

// interface Props {
//     text: string;
//     color: string;
//     textColor: string;
//     size?: number;
//     centralized: number;
//     borderTopLeftRadius?: number;
//     password: boolean;
//     visible?: boolean;
// }

interface Props {
    cardType: 1 | 2 | 3 | 4;
    ponto: string;
    color: string;
    textColor: string;
    clockin: boolean;
    intervalAtived?: boolean;
    planned?: string;
    onBaterPontoPress: () => void;
}

export default function (props: Props) {
    const navigation = useNavigation<StackTypes>();

    const [textCard, setTextCard] = useState("");
    const [pontoBatido, setPontoBatido] = useState(false);
    const [timePonto, setTimePonto] = useState("12:00");

    // ESTADO DOS PONTOS DIÁRIOS (depois que passar das 23:59, tem que ficar em false todos)
    const [entradaPonto, setEntradaPonto] = useState(true);
    const [startIntervaloPonto, setStartIntervaloPonto] = useState(true);
    const [finishIntervaloPonto, setFinishIntervaloPonto] = useState(true);
    const [saidaPonto, setSaidaPonto] = useState(false);

    function VerifyIcon() {
        if (props.cardType == 1) {
            return <EntradaIcon width={40} height={40}/>
        }
        if (props.cardType == 2) {
            return <IntervaloBeginIcon width={40} height={40}/>
        }
        if (props.cardType == 3) {
            return <IntervaloEndIcon width={30} height={30} marginRight={10}/>
        }
        if (props.cardType == 4) {
            return <SaidaIcon width={40} height={40}/>
        }
    };
    
    function Planejado() {
        if (props.planned != null) {
            return <Text style={[styles.textplanned, {
                color: "#83908D",
            }]}>
                Planejado{'\n'}
                {props.planned}
            </Text>
        }
        else {
            return <Text style={[styles.textplanned, {
                color: "#83908D",
            }]}>
            </Text>
        }
    };

    function VerifyPonto() {
        if(props.ponto != '') {
            return <Text style={styles.textPonto}>
                {props.ponto}
            </Text>
        }
        else {
            return (
                <View style={styles.cardBaterPonto}>
                    <TouchableOpacity style={[styles.buttonBaterPonto, {backgroundColor: '#4C3D3D'}]} 
                    onPress={props.onBaterPontoPress}
                    >
                        <Text style={[styles.textBaterPonto, {color: '#FFFFFF'}]}>Bater Ponto</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    useEffect(() => {
        if (props.cardType == 1)
            setTextCard("Entrada");
        if (props.cardType == 2)
            setTextCard("Início Intervalo");
        if (props.cardType == 3)
            setTextCard("Fim Intervalo");
        if (props.cardType == 4)
            setTextCard("Saída");
    }, []);

    return props.intervalAtived == true ? (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: props.color,
                    width: "90%",
                    height: 50,
                    margin: "1%",
                    borderRadius: 10,
                    elevation: 5,
                    alignItems: "center",
                    justifyContent: "space-evenly",

                }]}
        // onPress={() => navigation.navigate(props.nextPage, props.mode)}
        >
            {VerifyIcon()}
            <Text style={{
                color: props.textColor,
                fontWeight: "bold",
                fontSize: 19,
                width: "30%",
                // backgroundColor: "green",
            }}>
                {textCard}
            </Text>
            {Planejado()}
            {VerifyPonto()}
            {/* {props.cardType === 4 && props.ponto === '' ? ( // Only show "Bater Ponto" button for cardType 1 when ponto is empty
                <View style={styles.cardBaterPonto}>
                    <TouchableOpacity
                        style={[styles.buttonBaterPonto, { backgroundColor: '#4C3D3D' }]}
                        onPress={props.onBaterPontoPress} // Call the onBaterPontoPress function on button press
                    >
                        <Text style={[styles.textBaterPonto, { color: '#FFFFFF' }]}>Bater Ponto</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.textPonto}>{props.ponto}</Text>
            )} */}
        </View>
    )
        : false
}