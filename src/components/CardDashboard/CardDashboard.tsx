import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles"
import { StackTypes } from '../../../App';
import TimeMoneyIcon from '../../../assets/svg/homem_tempo_dinheiro.svg';
import RelogioIcon from '../../../assets/svg/relogio.svg';
import CoinsIcon from '../../../assets/svg/moedas.svg';
import GiveMoneyIcon from '../../../assets/svg/mao_dinheiro.svg';
import FaltaIcon from '../../../assets/svg/falta.svg';

interface Props {
    cardType: 1 | 2 | 3 | 4 | 5;
    color: string;
    textColor: string;
    value: string | number;
}

export default function (props: Props) {
    const navigation = useNavigation<StackTypes>();

    const [textCard, setTextCard] = useState("");
    const [horasExtras, setHorasExtras] = useState(16);
    const [minExtras, setMinExtras] = useState(35);
    const [horasMinExtras, setHorasMinExtras] = useState(horasExtras + ":" + minExtras);
    // const [horasTrabalhadas, setHorasTrabalhadas] = useState(142);
    const [realOrDolar, setRealOrDolar] = useState(false);

    function VerifyIcon() {
        if (props.cardType == 1)
            return <TimeMoneyIcon width={40} height={40} />
        if (props.cardType == 2)
            return <RelogioIcon width={40} height={40} />
        if (props.cardType == 3)
            return <CoinsIcon width={40} height={40} />
        if (props.cardType == 4)
            return <GiveMoneyIcon width={40} height={40} />
        if (props.cardType == 5)
            return <FaltaIcon width={40} height={40} />
    };

    function ChangeRealDolar() {
        if(realOrDolar == true)
            setRealOrDolar(false);
        else
            setRealOrDolar(true);
    };

    function VerifyRealDolar() {
        if (props.cardType == 3) {
            if (realOrDolar == false) {
                return <TouchableOpacity onPress={ChangeRealDolar}>
                    <Text style={[styles.textResult, { color: "#83908D", fontSize: 17}]}>
                        R$
                    </Text>
                </TouchableOpacity>
            }
            else {
                return <TouchableOpacity onPress={ChangeRealDolar}>
                    <Text style={[styles.textResult, { color: "#83908D", fontSize: 17}]}>
                        $
                    </Text>
                </TouchableOpacity>
            }
        }
    };

    function Result() {
        if (props.cardType == 1) {
            if (horasExtras >= 0 && minExtras >= 0)
                return <Text style={[styles.textResult, { color: "#4AD658" }]}>{props.value == '' ? 0 : '+'+props.value}</Text>
            else
                return <Text style={[styles.textResult, { color: "#D64A4A" }]}>-{props.value}</Text>
        }
        if (props.cardType == 2) {
            return <Text style={[styles.textResult, { color: "#000000" }]}>{props.value}</Text>
        }
        if (props.cardType == 3) {
            return <Text style={[styles.textResult, { color: "#000000", marginBottom: "10%" }]}>R$10,67</Text>
        }
        if (props.cardType == 4) {
            return <Text style={[styles.textResult, { color: "#000000" }]}>R$170,72</Text>
        }
        if (props.cardType == 5) {
            return <Text style={[styles.textResult, { color: "#000000" }]}>{props.value > 0 ? props.value : 0}</Text>
        }
    };

    useEffect(() => {
        if (props.cardType == 1)
            setTextCard("Banco de Horas");
        if (props.cardType == 2)
            setTextCard("Total de Horas Trabalhadas");
        if (props.cardType == 3)
            setTextCard("Valor\nHora de Trabalho");
        if (props.cardType == 4)
            setTextCard("Valor a receber pelas horas extras");
        if (props.cardType == 5)
            setTextCard("Total de Faltas");
    }, []);

    return (
        <View
            style={[styles.card, { backgroundColor: props.color }]}
        >
            <View style={styles.insideblock}>
                {VerifyIcon()}
                <Text style={[styles.textcard, {
                    color: props.textColor,
                }]}>
                    {textCard}
                </Text>
                <View style={styles.result}>
                    {VerifyRealDolar()}
                    {Result()}
                </View>
            </View>
        </View>
    )
}