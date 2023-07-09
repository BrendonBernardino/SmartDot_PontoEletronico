import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../../../../App';
import PerfilIdIcon from '../../../.././assets/svg/perfil_id.svg';
import LogoutIcon from '../../../.././assets/svg/logout.svg';
import Toast from 'react-native-toast-message'

import ENV from '../../../../env';

const apiUrl = ENV.API_URL;

function Profiles() {
    const navigation = useNavigation<StackTypes>();

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [greeting, setGreeting] = useState('Bom dia');

    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0');

    const verifyMorningEveningNight = () => {
        if(date.getHours() >= 4 && date.getHours() <= 12) {
            setGreeting('Bom dia');
        }
        if(date.getHours() >= 13 && date.getHours() <= 17) {
            setGreeting('Boa tarde');
        }
        if((date.getHours() >= 18 && date.getHours() <= 23) || (date.getHours() >= 0 && date.getHours() <= 3)) {
            setGreeting('Boa noite');
        }
    };

    const handleRequisition = async () => {
        const url = `${apiUrl}/manager/info`;

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setName(data.name);
                setId(data.id);
                setEmail(data.email);
                if (data.role) {
                    setCompanyName(data.company_name);
                }
            } else {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errors;
                
                Toast.show({
                    type: 'error',
                    text1: errorMessage || 'Não foi possível recarregar'
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: String(error)
            });
        }
    };

    const updateUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/users/${id}`,
                {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                });

            if (response.ok) {
                setModalVisible(false);
                Toast.show({
                    type: 'success',
                    text1: 'Atualizado com sucesso'
                })
            } else {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errors;
                
                Toast.show({
                    type: 'error',
                    text1: errorMessage || 'Não foi possível recarregar'
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: String(error)
            });
        }
    };
    
    useEffect(() => {
        verifyMorningEveningNight();
        handleRequisition();
    }, []);

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('role');
        navigation.navigate("Initial")
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    interface CustomTextInputProps {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
    }
    
    const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, value, onChangeText }) => (
        <View style={{ marginBottom: 10 }}>
            <Text>{label}</Text>
            <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10 }}
            value={value}
            onChangeText={onChangeText}
            />
        </View>
    );
    
    return (
        <View style={styles.container}>
            <View style={[styles.yellowSection, { backgroundColor: '#FFD95A' }]}>
                <View style={styles.topRow}>
                    <Text style={styles.nameLeft}>GESTOR</Text>
                </View>
                <View style={styles.bottomRow}>
                    <PerfilIdIcon width={80} height={80} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{greeting}, {name}</Text>
                        <Text style={styles.userDescription}>{companyName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.whiteSection}>
                <View style={styles.settings}>
                    <TouchableOpacity style={styles.row} onPress={() => setModalVisible(true)}>
                        <Text style={styles.rowText}>Editar Perfil</Text>
                        <Ionicons style={styles.seta} name="chevron-forward-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.LogoutLayer, { backgroundColor: '#FFFFFF' }]}>
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/Logo.png')}
                />
                <TouchableOpacity style={[styles.LogoutButton, { backgroundColor: "#FFD95A" }]} onPress={() => logOut()}>
                    <LogoutIcon width={28} height={28} />
                    <Text style={styles.LogoutText}>Sair da Conta</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <CustomTextInput
                        label="Nome"
                        value={name}
                        onChangeText={setName}
                    />

                    <CustomTextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <CustomTextInput
                        label="Senha"
                        value={''}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity onPress={updateUser} style={styles.saveButton}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default Profiles;
