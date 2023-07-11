import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { SelectList } from 'react-native-dropdown-select-list';
import styles from "./styles";
import Button from "../../../components/Button/Button";
import InputBlock from "../../../components/InputBlock/InputBlock";
import { StackTypes } from '../../../../App';
import Toast from 'react-native-toast-message'
import ENV from '../../../../env';
import { useCromaChange } from '../Initial/initial';
import { COLORSLIGHT, COLORSDARK } from '../../../styles/themes/colors';

const apiUrl = ENV.API_URL;

function Register() {
    const navigation = useNavigation<StackTypes>();

    const [userType, setUserType] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [senha, setSenha] = useState('');

    const { themeModeCroma } = useCromaChange();
    const { changethemeModeCroma } = useCromaChange();

    const data = [
        { key: '1', value: 'Colaborador' },
        { key: '2', value: 'Gestor' }
    ]

    const handleRegistrar = () => {
        const data = {
          name: nome,
          email: email,
          company_name: nomeEmpresa,
          password: senha,
          role_type: userType
        };
        const url = `${apiUrl}/register`

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'user': data}),
        })
          .then(response => response.json())
          .then(responseData => {
            Toast.show({
                type: 'success',
                text1: 'Registro com sucesso!'
            })
            navigation.navigate("Login")
          })
          .catch(error => {
            Toast.show({
                type: 'error',
                text1: error
            })
          });
      };

    useEffect(() => {
    }, [userType]);

    return (
        <View style={[styles.container, {backgroundColor: themeModeCroma === COLORSLIGHT ? themeModeCroma.primary : themeModeCroma.primary}]}>
            <View style={styles.logolayer}>
                <Image
                    style={styles.logo}
                    source={themeModeCroma === COLORSLIGHT ? require('../../../../assets/Logosvg_1.png') : require('../../../../assets/Logosvg_2.png')}
                />
                <SelectList
                    data={data}
                    // onSelect={ColabOrManager}
                    defaultOption={{ key: '1', value: 'Colaborador' }}
                    search={false}
                    maxHeight={80}
                    setSelected={setUserType}
                    boxStyles={{ borderWidth: 0 }}
                    inputStyles={{ height: "100%", color: themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.tertiary, fontSize: 20, fontWeight: "bold" }}
                    dropdownStyles={{ height: "50%", borderWidth: 0 }}
                    dropdownTextStyles={{ fontWeight: "bold", color: themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.tertiary }}
                // arrowicon={<Text></Text>}
                />
            </View>
            <View style={styles.midlayer}>
                <InputBlock
                    text="Nome"
                    color={themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.secundary}
                    textColor={themeModeCroma === COLORSLIGHT ? themeModeCroma.secundary : themeModeCroma.gray}
                    size={userType == 2 ? 53 : 59}
                    centralized={0}
                    borderTopLeftRadius={33}
                    password={false}
                    visible={true}
                    onChangeText={setNome}
                />
                <InputBlock
                    text="Email"
                    color={themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.secundary}
                    textColor={themeModeCroma === COLORSLIGHT ? themeModeCroma.secundary : themeModeCroma.gray}
                    size={userType == 2 ? 53 : 59}
                    centralized={0}
                    password={false}
                    visible={true}
                    onChangeText={setEmail}
                />
                <InputBlock
                    text="Nome da Empresa"
                    color={themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.secundary}
                    textColor={themeModeCroma === COLORSLIGHT ? themeModeCroma.secundary : themeModeCroma.gray}
                    size={userType == 2 ? 53 : 59}
                    centralized={0}
                    password={false}
                    visible={userType == 2 ? true : false}
                    onChangeText={setNomeEmpresa}
                />
                <InputBlock
                    text="Senha"
                    color={themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.secundary}
                    textColor={themeModeCroma === COLORSLIGHT ? themeModeCroma.secundary : themeModeCroma.gray}
                    size={userType == 2 ? 53 : 59}
                    centralized={0}
                    password={true}
                    visible={true}
                    onChangeText={setSenha}
                />
            </View>
            <View style={styles.registerlayer}>
                <Button
                    text="Criar Conta"
                    color={themeModeCroma === COLORSLIGHT ? themeModeCroma.auxiliar : themeModeCroma.tertiary}
                    textColor={themeModeCroma === COLORSLIGHT ? themeModeCroma.text : themeModeCroma.primary}
                    centralized={1}
                    onPress={handleRegistrar}
                    borderBottomRightRadius={33}
                />
            </View>
            <View style={styles.infolayer}>
                <Text style={{ color: "#83908D", fontWeight: "bold", fontSize: 19 }}>Já tem uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: themeModeCroma === COLORSLIGHT ? themeModeCroma.tertiary : themeModeCroma.tertiary, fontWeight: "bold", fontSize: 19, paddingBottom: "10%" }}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Register;