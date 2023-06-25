import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from 'react-native-vector-icons'
import { SelectList } from 'react-native-dropdown-select-list';
import styles from "./styles";
import Button from "../../../components/Button/Button";
import InputBlock from "../../../components/InputBlock/InputBlock";
import { StackTypes } from '../../../../App';

function Register() {
    const navigation = useNavigation<StackTypes>();

    const [userType, setUserType] = useState(0);

    const data = [
        { key: '1', value: 'Colaborador' },
        { key: '2', value: 'Colaborador Independente' },
        { key: '3', value: 'Gestor' },
        // {key:'4', value:'Computers', disabled:true},
    ]

    useEffect(() => {
    }, [userType]);

    return (
        <View style={styles.container}>
            <View style={styles.logolayer}>
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/Logosvg_1.png')}
                />
                <SelectList
                    data={data}
                    // onSelect={ColabOrManager}
                    defaultOption={{ key: '1', value: 'Colaborador' }}
                    search={false}
                    maxHeight={80}
                    setSelected={setUserType}
                    boxStyles={{ borderWidth: 0 }}
                    inputStyles={{ height: "100%", color: "#C07F00", fontSize: 20, fontWeight: "bold" }}
                    dropdownStyles={{ height: "50%", borderWidth: 0 }}
                    dropdownTextStyles={{ fontWeight: "bold" }}
                // arrowicon={<Text></Text>}
                />
            </View>
            <View style={styles.midlayer}>
                <InputBlock
                    text='Nome'
                    color='#C07F00'
                    textColor='#FFD95A'
                    size={userType == 3 ? 53 : 59}
                    centralized={0}
                    borderTopLeftRadius={33}
                    password={false}
                    visible={true}
                />
                <InputBlock
                    text='Email'
                    color='#C07F00'
                    textColor='#FFD95A'
                    size={userType == 3 ? 53 : 59}
                    centralized={0}
                    password={false}
                    visible={true}
                />
                <InputBlock
                    text='Nome de usuário'
                    color='#C07F00'
                    textColor='#FFD95A'
                    size={userType == 3 ? 53 : 59}
                    centralized={0}
                    password={false}
                    visible={true}
                />
                <InputBlock
                    text='Nome da Empresa'
                    color='#C07F00'
                    textColor='#FFD95A'
                    size={userType == 3 ? 53 : 59}
                    centralized={0}
                    password={false}
                    visible={userType == 3 ? true : false}
                />                   
                <InputBlock
                    text='Senha'
                    color='#C07F00'
                    textColor='#FFD95A'
                    size={userType == 3 ? 53 : 59}
                    centralized={0}
                    password={true}
                    visible={true}
                />
                <InputBlock
                    text='Confirmar Senha'
                    color='#C07F00'
                    textColor='#FFD95A'
                    size={userType == 3 ? 53 : 59}
                    centralized={0}
                    password={true}
                    visible={true}
                />
                {/* <Ionicons name="eye-outline" size={25}/> */}
            </View>
            <View style={styles.registerlayer}>
                <Button
                    text="Criar Conta"
                    color="#4C3D3D"
                    textColor="#CBE4DE"
                    centralized={1}
                    nextPage="Home"
                    borderBottomRightRadius={33}
                />
            </View>
            <View style={styles.infolayer}>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 19 }}>Já tem uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: "#C07F00", fontWeight: "bold", fontSize: 19, paddingBottom: "10%" }}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Register;