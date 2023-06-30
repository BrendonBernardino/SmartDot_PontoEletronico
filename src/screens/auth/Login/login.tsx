import { Text, View, Image, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Button from "../../../components/Button/Button";
import InputBlock from "../../../components/InputBlock/InputBlock";
import { StackTypes } from '../../../../App';
import Toast from 'react-native-toast-message'

function Login() {
    const navigation = useNavigation<StackTypes>();
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isChecked, setChecked] = useState(false);

    const handleUsernameOrEmailChange = (inputUsernameOrEmail: string) => {
        setUsernameOrEmail(inputUsernameOrEmail);
        console.log(usernameOrEmail);
    };

    const handlePassChange = (inputPass: string) => {
        setPassword(inputPass);
        console.log(password);
    };

    const handleLogin = async () => {
        const apiUrl = 'https://07be-2804-d4b-7aa4-c00-777e-3364-c647-4e66.ngrok-free.app/login'
        const credentials = {
            email: usernameOrEmail,
            password: password,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            console.log(usernameOrEmail)
            console.log(password)
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const role = data.role;

                // Salvar o token no AsyncStorage
                await AsyncStorage.setItem('token', token);

                Toast.show({
                    type: 'success',
                    text1: 'Logado com sucesso!'
                })

                if (role === 'colab'){
                  navigation.navigate("HomeTabs")
                } else {
                  navigation.navigate("HomeManager")
                }
            } else {
                // Login falhou, lidar com o erro
                // Por exemplo, você pode exibir uma mensagem de erro para o usuário
                // navigation.navigate("HomeTabs")
                Toast.show({
                    type: 'error',
                    text1: 'Login falhou. Por favor tente novamente.'
                })
                console.log('Login falhou');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Não foi possível logar. Por favor tente novamente mais tarde.'
            })
            // Lidar com erros de rede ou da API
            console.log('Ocorreu um erro:', error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.logolayer}>
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/Logosvg_1.png')}
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
                    visible={true}
                    onChangeText={handleUsernameOrEmailChange}
                />
                <InputBlock
                    text='Senha'
                    color='#C07F00'
                    textColor='#FFD95A'
                    centralized={0}
                    password={true}
                    visible={true}
                    onChangeText={handlePassChange}
                />
                {/* <Ionicons name="eye-outline" size={25}/> */}
            </View>
            <View style={[styles.infolayer, { flexDirection: "row", width: "80%" }]}>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 15 }}>Esqueceu a senha?</Text>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 15 }}>Lembrar de mim</Text>
                <CheckBox
                    style={{ borderColor: "#C07F00" }}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#C07F00' : undefined}
                />
            </View>
            <View style={styles.loginlayer}>
                <Button
                    text="Entrar"
                    color="#4C3D3D"
                    textColor="#CBE4DE"
                    centralized={1}
                    onPress={handleLogin}
                    borderBottomRightRadius={33}
                />
            </View>
            <View style={styles.infolayer}>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 19 }}>Não tem conta ainda?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={{ color: "#C07F00", fontWeight: "bold", fontSize: 19, paddingBottom: "10%" }}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Login;