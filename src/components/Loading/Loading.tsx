import React from 'react';
import { View, StyleSheet } from 'react-native';
import styles from "./styles";
import LottieView from 'lottie-react-native';

const Loading = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('../../../assets/loader.json')} style={styles.loading} autoPlay loop/>
        </View>
    );
};

export default Loading;