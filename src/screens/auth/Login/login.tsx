import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React from 'react';
import styles from "./styles"
import Button from "../../../components/Button/Button";
import InputBlock from "../../../components/InputBlock/InputBlock";

function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.logolayer}>
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/Logo.png')}
                />
            </View>
            <View style={styles.midlayer}>
                <InputBlock
                    text='Email ou Nome de usuário'
                    color='#C07F00'
                    textColor='#FFD95A'
                    centralized={0}
                    borderTopLeftRadius={33}
                    password={false}
                />
                <InputBlock
                    text='Senha'
                    color='#C07F00'
                    textColor='#FFD95A'
                    centralized={0}
                    password={true}
                />
            </View>
            <View style={[styles.infolayer, { justifyContent: 'space-evenly', flexDirection: "row", width: "80%" }]}>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 15 }}>Esqueceu a senha?</Text>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 15 }}>Lembrar de mim</Text>
            </View>
            <View style={styles.loginlayer}>
                <Button
                    text="Entrar"
                    color="#4C3D3D"
                    textColor="#CBE4DE"
                    centralized={1}
                    nextPage="ClockIn"
                    borderBottomRightRadius={33}
                />
            </View>
            <View style={styles.infolayer}>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 19 }}>Não tem conta ainda?</Text>
                <Text style={{ color: "#C07F00", fontWeight: "bold", fontSize: 19, paddingBottom: "10%" }}>Criar Conta</Text>
            </View>
        </View>
    )
}
export default Login;