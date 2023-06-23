import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles"
import { StackTypes } from '../../../App';

interface Props {
    rightPage: string;
    centerPage: string;
    leftPage: string;
    mode?: unknown;
}

export default function (props: Props) {
    const navigation = useNavigation<StackTypes>();
    return (
      <View style={styles.containerFooter}>
        <TouchableOpacity onPress={() => navigation.navigate(props.leftPage, props.mode)}>
          <Image
            style={styles.iconFooter}
            source={require('../../../assets/dashboard-svgrepo-com 1.svg')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(props.centerPage, props.mode)}>
          <Image
            style={styles.iconFooter}
            source={require('../../../assets/employee-id-svgrepo-com 1.svg')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(props.rightPage, props.mode)}>
          <Image
            style={styles.iconFooter}
            source={require('../../../assets/person-svgrepo-com 1.svg')}
          />
        </TouchableOpacity>
      </View>
    )
}
