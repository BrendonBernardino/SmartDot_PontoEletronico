import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Calendar from "../../../components/Calendar/index";
import FooterMenu from "../../../components/FooterMenu/manage";
import SearchBar from "../../../components/SearchBar/index";
import styles from './style';

interface TimeData {
  padrao: string;
  real: string;
  situacao: string;
  latitude: string;
  longitude: string;
  local_name: string;
}

interface TaskData {
  user_name: string;
  tempo_total: string;
  tempo_inicial: TimeData;
  intervalo_inicial: TimeData;
  intervalo_final: TimeData;
  tempo_final: TimeData;
}

interface TaskCardProps {
  taskData: TaskData;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskData, index }) => {
  const isEvenIndex = index % 2 === 0;
  const cardColor = isEvenIndex ? '#FFD95A' : '#FFF7D4';
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconPress = () => {
    setModalVisible(true);
  };

  const MapModal: React.FC = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          {/* Renderizar o mapa aqui */}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <View style={styles.column}>
        <Text style={styles.text}>{taskData.user_name}</Text>
        <Text style={styles.text}>Entrada ({taskData.tempo_inicial.padrao})</Text>
        <Text style={styles.text}>Intervalo Iníc. ({taskData.intervalo_inicial.padrao})</Text>
        <Text style={styles.text}>Intervalo Fim ({taskData.intervalo_final.padrao})</Text>
        <Text style={styles.text}>Saída ({taskData.tempo_final.padrao})</Text>
      </View>
      <View style={styles.columnCenter}>
        <View />
        {[1, 2, 3, 4].map((_, index) => <View key={index} style={styles.line} />)}
      </View>
      <View style={styles.columnSecond}>
        <Text style={styles.text}>Jornada {taskData.tempo_total}</Text>
        <Text style={styles.text}>{taskData.tempo_inicial.situacao} {taskData.tempo_inicial.real}</Text>
        <Text style={styles.text}>{taskData.intervalo_inicial.situacao} {taskData.intervalo_inicial.real}</Text>
        <Text style={styles.text}>{taskData.intervalo_final.situacao} {taskData.intervalo_final.real}</Text>
        <Text style={styles.text}>{taskData.tempo_final.situacao} {taskData.tempo_final.real}</Text>
      </View>

      <MapModal />
    </View>
  );
};

interface TaskListProps {}

const TaskList: React.FC<TaskListProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [jsonData, setJsonData] = useState<TaskData[]>([]);
  const [data, setData] = useState('');

  const fetchData = async (date: string, name?: string) => {
    try {
      let url = `http://127.0.0.1:3000/manager/point_presences?data=${date}`;

      if (name) {
        url += `&name=${name}`;
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJyZW5kb25AZ21haWwuY29tIiwiZXhwIjoxNzE5MjU4NzI1fQ.9AyJA-0nmnDBmLcbBcoXqgBRqWMMRNgtQM0lXqSgcps',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setJsonData(data);
      setData(date);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    fetchData(formattedDate);
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (name: string) => {
    fetchData(data, name);
  };

  const handleDatePress = (date: any) => {
    const { day, month, year } = date;
    const formattedDate = `${day}-${month + 1}-${year}`;
    fetchData(formattedDate);
    handleCloseModal();
  };

  const Header: React.FC = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerIcon}>
        <Icon name="bars" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Texto 1</Text>
        <View style={styles.headerDivider} />
        <Text style={styles.headerText}>Texto 2</Text>
      </View>
      <TouchableOpacity onPress={handleOpenModal} style={styles.headerIcon}>
        {/* Substitua a imagem pelo ícone desejado */}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />

      <View style={styles.containerCard}>
        {jsonData.map((taskData, index) => (
          <TaskCard key={index} taskData={taskData} index={index} />
        ))}
      </View>

      <FooterMenu leftPage="ManagerPointPresences" centerPage="ManagerCollaborators" rightPage="ManagerProfiles" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Calendar onDatePress={handleDatePress} />

            <TouchableOpacity onPress={handleCloseModal} style={{ marginTop: 10 }}>
              <Text style={{ color: 'blue', textAlign: 'center' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskList;
