import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../../../../App';
import PerfilIdIcon from '../../../.././assets/svg/perfil_id.svg';
import HelpIcon from '../../../.././assets/svg/help.svg';
import LogoutIcon from '../../../.././assets/svg/logout.svg';


function Perfil() {
    const navigation = useNavigation<StackTypes>();

    return (
        <View style={styles.container}>
            <View style={[styles.yellowSection, { backgroundColor: '#FFD95A' }]}>
                <View style={styles.topRow}>
                    <Text style={styles.nameLeft}>COLABORADOR INDEPENDENTE</Text>
                    <View style={styles.iconContainer}>
                        {/* <Ionicons name="help-circle-outline" size={24} color="black" /> */}
                        <TouchableOpacity>
                            <HelpIcon width={28} height={28} marginHorizontal={5} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} color="black" marginHorizontal={5} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomRow}>
                    {/* <Ionicons name="person-circle-outline" size={60} color="black" /> */}
                    <PerfilIdIcon width={80} height={80} margin={10} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Bom dia, Brendon</Text>
                        <Text style={styles.userDescription}>Desenvolvedor de Firmware de Sistemas Embarcados</Text>
                    </View>
                </View>
            </View>
            <View style={styles.whiteSection}>
                <View style={styles.settings}>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Editar Perfil</Text>
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
        </View>
    );
}
export default Perfil;
