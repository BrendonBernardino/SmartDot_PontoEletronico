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
    color: string;
    textColor: string;
    clockin: boolean;
    intervalAtived?: boolean;
    planned?: string;
    // borderTopLeftRadius?: number;
    // borderBottomRightRadius?: number;
    // elevation?: number;
    // centralized: number;
    // nextPage: string;
    // mode?: unknown;
}

export default function (props: Props) {
    const navigation = useNavigation<StackTypes>();

    const [textCard, setTextCard] = useState("");
    const [pontoBatido, setPontoBatido] = useState(true);
    const [timePonto, setTimePonto] = useState("12:00");

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
            return <Text style={{
                // left: 80,
                // flex: 0.24,
                // backgroundColor: "pink",
                // alignItems: "center",
                // justifyContent: "center",
                textAlign: "center",
                color: "#83908D",
                // fontWeight: "bold",
                width: "20%",
                fontSize: 15
            }}>
                Planejado{'\n'}
                {props.planned}
            </Text>
        }
        else {
            return <Text style={{
                // left: 80,
                // flex: 0.24,
                // backgroundColor: "pink",
                // alignItems: "center",
                // justifyContent: "center",
                textAlign: "center",
                color: "#83908D",
                fontWeight: "bold",
                width: "16%",
                fontSize: 19
            }}>
            </Text>
        }
    };

    function VerifyPonto() {
        if (pontoBatido == true) {
            return <Text style={{
                // backgroundColor: "blue",
                textAlign: "center",
                // color: "#83908D",
                fontWeight: "bold",
                width: "20%",
                fontSize: 22,
            }}>
                {timePonto}
            </Text>
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
        </View>
    )
        : false
}