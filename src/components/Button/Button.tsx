import { Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../styles/themes/colors';
import { StackTypes } from '../../../App';

interface Props {
    text: string;
    color: string;
    textColor: string;
    borderTopLeftRadius?: number;
    borderBottomRightRadius?: number;
    elevation?: number;
    centralized: number;
    nextPage: string;
    mode: unknown;
}

export default function (props: Props) {
    // const [themeMode, setThemeMode] = useState(props.mode);
    const navigation = useNavigation<StackTypes>();
    return (
        <TouchableOpacity
            style={[
                styles.buttom,
                {
                    backgroundColor: props.color,
                    borderTopLeftRadius: props.borderTopLeftRadius,
                    borderBottomRightRadius: props.borderBottomRightRadius,
                    elevation: props.elevation,
                    alignItems: props.centralized == 0 ? "flex-start" : "center"
                }]}
            onPress={() => navigation.navigate(props.nextPage, props.mode)}
        >
            <Text style={{ color: props.textColor, fontWeight: "bold", fontSize: 19 }}>{props.text}</Text>
        </TouchableOpacity>
    )
}