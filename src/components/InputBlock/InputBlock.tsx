import { View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from "./styles";
import { StackTypes } from '../../../App';
import { Ionicons } from 'react-native-vector-icons';
import { useCromaChange } from '../../screens/auth/Initial/initial';
import { COLORSLIGHT, COLORSDARK } from '../../styles/themes/colors';

interface Props {
    text: string;
    color: string;
    textColor: string;
    size?: number;
    centralized: number;
    password: boolean;
    visible?: boolean;
    onChangeText: (text: string) => void;
}

export default function (props: Props) {
    const [showPassword, setShowPassword] = useState(true);
    const { themeModeCroma } = useCromaChange();
    const { changethemeModeCroma } = useCromaChange();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return props.visible == true ? (
        <View
            style={[
                styles.buttom,
                {
                    backgroundColor: props.color,
                    width: "65%",
                    height: props.size != null ? props.size : 59,
                    alignItems: props.centralized == 0 ? "flex-start" : "center"

                }]}
        >
            <View style={styles.layerButton}>
                <TextInput style={styles.input}
                    placeholder={props.text}
                    placeholderTextColor={props.textColor}
                    onChangeText={(text) => {
                        // onChangeNumber(text);
                        props.onChangeText(text);
                    }}
                    secureTextEntry={props.password == true ? showPassword : false}
                    cursorColor={props.textColor}
                    selectionColor={props.textColor}
                />
                {props.password == true ?
                    <TouchableOpacity style={styles.eye} onPress={handleTogglePasswordVisibility}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={25} color={themeModeCroma === COLORSLIGHT ? themeModeCroma.secundary : themeModeCroma.gray} />
                    </TouchableOpacity>
                    : null}
                {/* </TextInput> */}
                {/* <Ionicons name="eye-outline" size={25}/> */}
            </View>
        </View>
    ) : false
}