import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../../../../App';
import PerfilIdIcon from '../../../.././assets/svg/perfil_id.svg';
import LogoutIcon from '../../../.././assets/svg/logout.svg';
import Toast from 'react-native-toast-message';
import Loading from '../../../components/Loading/Loading';

import ENV from '../../../../env';

const apiUrl = ENV.API_URL;

function Perfil() {
    const navigation = useNavigation<StackTypes>();

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('');

    const handleRequisition = async () => {
        setIsLoading(true);
        const url = `${apiUrl}/collaborator/users`;

        try {
            const token = await AsyncStorage.getItem('token');
            const storedRole = await AsyncStorage.getItem('role');
            if (storedRole !== null) {
                setRole(storedRole);
            }
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
                setCompanyName(data.company_name);
                setIsLoading(false);
            } else {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.errors;

                Toast.show({
                    type: 'error',
                    text1: errorMessage || 'Não foi possível recarregar'
                })
                setIsLoading(false);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: String(error)
            });
            setIsLoading(false);
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

    const rejectInvite = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/collaborator/users/reject`,
                {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({})
                });

            if (response.ok) {
                navigation.navigate("Perfil")
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

    const acceptInvite = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/collaborator/users/accept`,
                {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({})
                });

            if (response.ok) {
                setModalVisible(false);
                setRole('collaborator_active');
                await AsyncStorage.setItem('role', role);
                navigation.navigate("HomeTabs")
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

    function visibleInvite() {
        console.log(role);
        if (role == 'collaborator_pending' && (companyName !== "" && companyName !== null)) {
            return (
                <View style={styles.card}>
                    <Text style={styles.title}>Convite</Text>
                    <Text style={styles.description}>
                        Você recebeu um convite da empresa {companyName}. Deseja aceitar?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.declineButton} onPress={rejectInvite}>
                            <Text style={styles.buttonText}>Recusar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton} onPress={acceptInvite}>
                            <Text style={styles.buttonTextInvite}>Aceitar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    return isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF7D4' }}>
            <Loading />
        </View>
    ) : (
        <View style={styles.container}>
            <View style={[styles.yellowSection, { backgroundColor: '#FFD95A' }]}>
                <View style={styles.topRow}>
                    <Text style={styles.nameLeft}>COLABORADOR</Text>
                </View>
                <View style={styles.bottomRow}>
                    <PerfilIdIcon width={80} height={80} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Bom dia, {name}</Text>
                        <Text style={styles.userDescription}>{companyName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.whiteSection}>
                <View style={styles.settings}>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText} onPress={() => setModalVisible(true)}>Editar Perfil</Text>
                        <Ionicons style={styles.seta} name="chevron-forward-outline" size={24} color="black" />
                    </TouchableOpacity>

                    {visibleInvite()}
                    {/* {role == 'collaborator_pending' && companyName != '' ? (
                        <View style={styles.card}>
                            <Text style={styles.title}>Convite</Text>
                            <Text style={styles.description}>
                                Você recebeu um convite da empresa {companyName}. Deseja aceitar?
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.declineButton} onPress={rejectInvite}>
                                    <Text style={styles.buttonText}>Recusar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.acceptButton} onPress={acceptInvite}>
                                    <Text style={styles.buttonTextInvite}>Aceitar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : ('')} */}
                </View>
            </View>

            <View style={[styles.LogoutLayer, { backgroundColor: '#FFFFFF' }]}>

                <Image
                    style={styles.logo}
                    source={require('../../../../assets/Logo.png')}
                />
                <TouchableOpacity style={[styles.LogoutButton, { backgroundColor: "#FFD95A" }]} onPress={logOut}>
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
                            onChangeText={(text) => setName(text)}

                        />

                        <CustomTextInput
                            label="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />

                        <CustomTextInput
                            label="Senha"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
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
export default Perfil;
