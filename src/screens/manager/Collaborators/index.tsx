import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FooterMenu from "../../../components/FooterMenu/manage";
import SearchBar from "../../../components/SearchBar/index";

interface Task {
  id: number;
  name: string;
  description: string;
  deadline: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: 'Tarefa 1',
      description: 'Descrição da tarefa 1',
      deadline: '31/12/2023',
    },
    {
      id: 2,
      name: 'Tarefa 2',
      description: 'Descrição da tarefa 2',
      deadline: '15/12/2023',
    },
    {
      id: 3,
      name: 'Tarefa 3',
      description: 'Descrição da tarefa 3',
      deadline: '10/12/2023',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [horario, setHorario] = useState('');

  const handleRemoveTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: number) => {
    // Implemente a lógica de edição da tarefa com base no ID aqui
    console.log(`Editar tarefa com ID ${taskId}`);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSave = () => {
    // Aqui você pode fazer alguma ação com o horário coletado
    console.log('Horário selecionado:', horario);
    handleCloseModal();
  };

  const handleSearch = () => {
    // Implementar a lógica de pesquisa aqui
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskDeadline}>{item.deadline}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handleEditTask(item.id)}>
          <Ionicons name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
          <Ionicons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const Header: React.FC = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Colaboradores</Text>
        <View style={styles.headerDivider} />
        <Text style={styles.headerText}>Empresa</Text>
      </View>
      <TouchableOpacity style={styles.headerIcon}>
        <View style={styles.logolayer}>
          <Image
              style={styles.logo}
              source={require('../../../../assets/Logo.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Selecione um horário:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
              placeholder="Horário (00:00)"
              value={horario}
              onChangeText={text => setHorario(text)}
            />

            <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#c88f20', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCloseModal} style={{ marginTop: 10 }}>
              <Text style={{ color: 'blue', textAlign: 'center' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={handleOpenModal}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#c88f20',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>

      <FooterMenu leftPage="ManagerPointPresences" centerPage="ManagerCollaborators" rightPage="ManagerProfiles" />

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  taskName: {
    fontSize: 16,
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  taskDeadline: {
    fontSize: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: 'gray',
    height: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerIcon: {
    padding: 10,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerDivider: {
    backgroundColor: 'gray',
    height: 1,
    width: '80%',
    marginVertical: 4,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 4,
  },
  containerFooter: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    width: '60%',
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  iconFooter: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 30,
  },
  searchContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  searchButton: {
    padding: 8,
  },
  searchIconContainer: {
    backgroundColor: '#4C3D3D',
    borderRadius: 50,
    padding: 8,
  },
  logolayer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  logo: {
    // flex: 0.325,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
});

export default TaskList;
