import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterMenu from "../../../components/FooterMenu/manage";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.yellowSection}>
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

      <FooterMenu leftPage="ManagerPointPresences" centerPage="ManagerCollaborators" rightPage="ManagerProfiles" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  yellowSection: {
    flex: 1,
    backgroundColor: '#ffd95a',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  nameLeft: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameRight: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  whiteSection: {
    flex: 3,
    backgroundColor: 'white',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowText: {
    fontSize: 16,
    marginRight: 10,
  },
});
