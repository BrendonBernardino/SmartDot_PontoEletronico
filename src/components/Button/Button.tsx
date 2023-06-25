import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles"
import { StackTypes } from '../../../App';

interface Props {
    text: string;
    color: string;
    textColor: string;
    borderTopLeftRadius?: number;
    borderBottomRightRadius?: number;
    elevation?: number;
    centralized: number;
    onPress: () => void;
    mode?: unknown;
}

export default function (props: Props) {
    const navigation = useNavigation<StackTypes>();
    return (
        <TouchableOpacity
            style={[
                styles.buttom,
                {
                    backgroundColor: props.color,
                    width: "65%",
                    height: 59,
                    borderTopLeftRadius: props.borderTopLeftRadius,
                    borderBottomRightRadius: props.borderBottomRightRadius,
                    elevation: props.elevation,
                    alignItems: props.centralized == 0 ? "flex-start" : "center"

                }]}
            onPress={props.onPress}
        >
            <Text style={{ color: props.textColor, fontWeight: "bold", fontSize: 19 }}>{props.text}</Text>
        </TouchableOpacity>
    )
}