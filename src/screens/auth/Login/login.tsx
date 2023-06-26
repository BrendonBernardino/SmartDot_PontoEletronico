import { Text, View, Image, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Button from "../../../components/Button/Button";
import InputBlock from "../../../components/InputBlock/InputBlock";
import { StackTypes } from '../../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const navigation = useNavigation<StackTypes>();
  const [isChecked, setChecked] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const apiUrl = 'http://127.0.0.1:3000/login';
    const credentials = {
      email: emailOrUsername,
      password: password
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
  
        // Salvar o token no AsyncStorage
        await AsyncStorage.setItem('token', token);
  
        // Login bem-sucedido, navegar para a página desejada
        navigation.navigate("Register")
      } else {
        // Login falhou, lidar com o erro
        // Por exemplo, você pode exibir uma mensagem de erro para o usuário
        console.log('Login falhou');
      }
    } catch (error) {
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
          onChangeText={value => setEmailOrUsername(value)} // Atualiza o estado de emailOrUsername
        />
        <InputBlock
          text='Senha'
          color='#C07F00'
          textColor='#FFD95A'
          centralized={0}
          password={true}
          visible={true}
          onChangeText={value => setPassword(value)} // Atualiza o estado de password
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
