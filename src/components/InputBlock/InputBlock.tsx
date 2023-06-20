import { View, TextInput } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles"
import { StackTypes } from '../../../App';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    text: string;
    color: string;
    textColor: string;
    centralized: number;
    borderTopLeftRadius?: number;
    password: boolean;
}

export default function (props: Props) {
    const [number, onChangeNumber] = React.useState('');
    const navigation = useNavigation<StackTypes>();
    return (
        <View
            style={[
                styles.buttom,
                {
                    borderTopLeftRadius: props.borderTopLeftRadius,
                    backgroundColor: props.color,
                    width:"65%",
                    height: 59,
                    alignItems: props.centralized == 0 ? "flex-start" : "center"

                }]}
        >
            <TextInput style={styles.input}
                placeholder={props.text}
                placeholderTextColor={props.textColor}
                onChangeText={onChangeNumber}
                secureTextEntry={props.password}
                cursorColor={props.textColor}
                selectionColor={props.textColor}
            />
        </View>
    )
}