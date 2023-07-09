import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Button from "../../../components/Button/Button";
import InputBlock from "../../../components/InputBlock/InputBlock";
import { StackTypes } from '../../../../App';
import Toast from 'react-native-toast-message'
import ENV from '../../../../env';
import Loading from '../../../components/Loading/Loading';

const apiUrl = ENV.API_URL;

function Login() {
    const navigation = useNavigation<StackTypes>();
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleUsernameOrEmailChange = (inputUsernameOrEmail: string) => {
        setUsernameOrEmail(inputUsernameOrEmail);
    };

    const redirectPage = async () => {
        try {
            const role = await AsyncStorage.getItem('role');
            switch (role) {
                case 'manager':
                    navigation.navigate("HomeManager");
                    break;
                case 'collaborator_pending':
                    navigation.navigate("Perfil");
                    break;
                case 'collaborator_banned':
                    navigation.navigate("Perfil");
                    break;
                case 'collaborator_active':
                    navigation.navigate("HomeTabs");
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePassChange = (inputPass: string) => {
        setPassword(inputPass);
    };

    const handleLogin = async () => {
        setIsLoading(true);
        const url = `${apiUrl}/login`
        const credentials = {
            email: usernameOrEmail,
            password: password,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const role = data.role;

                // Salvar o token no AsyncStorage
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('role', role);

                Toast.show({
                    type: 'success',
                    text1: 'Logado com sucesso!'
                })
                setIsLoading(false);

                redirectPage();
            } else {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errors;
                
                Toast.show({
                    type: 'error',
                    text1: errorMessage || 'Login falhou. Por favor tente novamente.'
                })
                setIsLoading(false);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Não foi possível logar. Por favor tente novamente mais tarde.'
            })
            setIsLoading(false);
        }
    };

    useEffect(() => {
        redirectPage();
    }, []);

    return isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF7D4'}}>
            <Loading />
        </View>
    ) : (
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