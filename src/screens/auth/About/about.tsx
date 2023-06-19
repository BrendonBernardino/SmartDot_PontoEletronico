import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons, Feather, Entypo } from 'react-native-vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles"
import { COLORSLIGHT, COLORSDARK } from '../../../styles/themes/colors';
import GithubIcon from '../../../assets/github.svg';

function About() {
    const [themeMode, setThemeMode] = useState(COLORSLIGHT);
    const route = useRoute();
    // const {themeMode} = route.params;
    return (
        <View style={[styles.container, { backgroundColor: themeMode.primary }]}>
            <View style={styles.toplayer}>
                <Ionicons style={styles.back} name="chevron-back" size={10} />
                <Text style={styles.title}>PROJETO</Text>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/Logo.png')}
                />
            </View>
            <View style={styles.ufclayer}>
                <Image
                    style={styles.logoufc}
                    source={require('../../../assets/ufcuniv.png')}
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
                    source={require('../../../assets/Brendon.jpg')}
                />
                <Image
                    style={styles.photo}
                    source={require('../../../assets/Gabriel.jpg')}
                />
            </View>
            <View style={styles.githublayer}>
                <GithubIcon width={40} height={40}/>
            </View>
        </View>
    )
}
export default About;