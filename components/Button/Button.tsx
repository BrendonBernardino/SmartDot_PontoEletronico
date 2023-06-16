import { Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../styles/themes/colors';

interface Props {
    text: string;
    color: string;
    textColor: string;
    borderTopLeftRadius?: number;
    borderBottomRightRadius?: number;
    elevation?: number;
    centralized: number;
}

export default function(props: Props) {
    const [themeMode, setThemeMode] = useState(COLORSLIGHT);

    return(
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
        >
            <Text style={{color: props.textColor, fontWeight: "bold", fontSize: 19}}>{props.text}</Text>
        </TouchableOpacity>
    )
}