import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../../../../App';
import PerfilIdIcon from '../../../.././assets/svg/perfil_id.svg';
import HelpIcon from '../../../.././assets/svg/help.svg';
import LogoutIcon from '../../../.././assets/svg/logout.svg';


function Perfil() {
    const navigation = useNavigation<StackTypes>();
    const animation = useRef(new Animated.Value(0)).current;

    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [editedName, setEditedName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalHelpVisible, setModalHelpVisible] = useState(false);

    const handleRequisition = async () => {
        const apiUrl = 'https://b3af-2804-d4b-7aa4-c00-cb4a-606b-3371-afdb.ngrok-free.app/collaborator/users';
        console.log(apiUrl)

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setName(data.name);
                setCompanyName(data.company_name);

            } else {
                console.log('Solicitacao falhou');
            }
        } catch (error) {
            // Lidar com erros de rede ou da API
            console.log('Ocorreu um erro:', error);
        }
    };

    useEffect(() => {
        handleRequisition();
    }, []);

    const handleModalHelp = () => {
        setModalHelpVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.yellowSection, { backgroundColor: '#FFD95A' }]}>
                <View style={styles.topRow}>
                    <Text style={styles.nameLeft}>COLABORADOR</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleModalHelp}>
                            <HelpIcon width={28} height={28} marginHorizontal={5} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} color="black" marginHorizontal={5} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomRow}>
                    <PerfilIdIcon width={80} height={80} margin={10} />
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
                    {/* <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Configurações</Text>
                        <Ionicons style={styles.seta} name="chevron-forward-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Meu salário</Text>
                        <Ionicons style={styles.seta} name="chevron-forward-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Minhas horas semanais</Text>
                        <Ionicons style={styles.seta} name="chevron-forward-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Planejamento Entrada e Saída</Text>
                        <Ionicons style={styles.seta} name="chevron-forward-outline" size={24} color="black" />
                    </TouchableOpacity> */}
                </View>
            </View>
            <View style={[styles.LogoutLayer, { backgroundColor: '#FFFFFF' }]}>
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/Logo.png')}
                />
                <TouchableOpacity style={[styles.LogoutButton, { backgroundColor: "#FFD95A" }]} onPress={() => navigation.navigate("Initial")}>
                    <LogoutIcon width={28} height={28} />
                    <Text style={styles.LogoutText}>Sair da Conta</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Digite um novo nome"
                            value={editedName}
                            onChangeText={setEditedName}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton, { backgroundColor: '#FFD95A', }]}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton, { backgroundColor: '#4C3D3D', }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={modalHelpVisible} animationType="slide" transparent>
                <View style={styles.modalContent}>
                    <Text style={{ fontSize: 30 }}>S.O.S</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton, { backgroundColor: '#FFD95A' }]}
                        onPress={() => setModalHelpVisible(false)}
                    >
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
export default Perfil;
