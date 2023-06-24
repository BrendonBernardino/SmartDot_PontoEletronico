import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles";
// import FooterMenu from "../../../components/FooterMenu/manage";

function Perfil() {
  return (
    <View style={styles.container}>
      <View style={[styles.yellowSection, {backgroundColor: '#FFD95A'}]}>
        <View style={styles.topRow}>
          <Text style={styles.nameLeft}>Nome</Text>
          <View style={styles.iconContainer}>
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <Ionicons name="notifications-outline" size={24} color="black" />
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Ionicons name="person-circle-outline" size={60} color="black" />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nome do Usuário</Text>
            <Text style={styles.userDescription}>Descrição do Usuário</Text>
          </View>
        </View>
      </View>
      <View style={styles.whiteSection}>
        <View style={styles.row}>
          <Text style={styles.rowText}>Nome da Linha 1</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>Nome da Linha 2</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>Nome da Linha 3</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </View>

      {/* <FooterMenu leftPage="ManagerPointPresences" centerPage="ManagerCollaborators" rightPage="ManagerProfiles" /> */}

    </View>
  );
}
export default Perfil;
