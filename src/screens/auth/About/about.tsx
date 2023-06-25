import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { Ionicons } from 'react-native-vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../../styles/themes/colors';
import GithubIcon from '../../../../assets/svg/github.svg';

function About() {
    const [avatarBrendon, setAvatarBrendon] = useState(null);
    const [avatarGabriel, setAvatarGabriel] = useState(null);
    const [themeMode, setThemeMode] = useState(COLORSLIGHT);
    const navigation = useNavigation();
    const route = useRoute();
    // const {themeMode} = route.params;

    useEffect(() => {
        fetch("https://api.github.com/users/brendonbernardino")
            .then((response) => response.json())
            .then((data) => setAvatarBrendon(data.avatar_url))
            .catch(() => console.log("Erro"))
            .finally(() => console.log("Finalizado"));
    }, []);
    useEffect(() => {
        fetch("https://api.github.com/users/gabrielras")
            .then((response) => response.json())
            .then((data) => setAvatarGabriel(data.avatar_url))
            .catch(() => console.log("Erro"))
            .finally(() => console.log("Finalizado"));
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: themeMode.primary }]}>
            <View style={styles.toplayer}>
                <TouchableOpacity style={{ flex: 0.1 }} onPress={() => {navigation.goBack();}}>
                    <Ionicons style={styles.back} name="chevron-back" size={10} />
                </TouchableOpacity>
                <Text style={styles.title}>PROJETO</Text>
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/Logosvg_1.png')}
                />
            </View>
            <View style={styles.ufclayer}>
                <Image
                    style={styles.logoufc}
                    source={require('../../../../assets/ufcuniv.png')}
                />
            </View>
            <View style={styles.descriptionlayer}>
                <Text style={styles.text}>
                    Este aplicativo é o projeto final da cadeira de Computação Móvel
                    2023.1, ofertada pela Universidade Federal do Ceará (UFC) e
                    ministrada pelos professores Danielo e Ronald, do curso de
                    Engenharia de Computação.
                </Text>
                <Text style={styles.text}>
                    Equipe: Brendon Wesley e Gabriel Rocha.
                </Text>
            </View>
            <View style={styles.photoslayer}>
                <Image
                    style={styles.photo}
                    source={{ uri: avatarBrendon }}
                />
                <Image
                    style={styles.photo}
                    source={{ uri: avatarGabriel }}
                />
            </View>
            <View style={styles.githublayer}>
                <TouchableOpacity onPress={() => {
                        Linking.openURL('https://github.com/BrendonBernardino');
                    }}>
                    <GithubIcon width={40} height={40} paddingRight={90}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                        Linking.openURL('https://github.com/gabrielras');
                    }}>
                    <GithubIcon width={40} height={40} paddingRight={90}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default About;