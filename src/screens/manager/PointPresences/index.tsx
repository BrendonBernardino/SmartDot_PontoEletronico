import React, { useState, useEffect } from 'react';
import { Modal, Image, ScrollView, ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Calendar from "../../../components/Calendar/Calendar";
import FooterMenu from "../../../components/FooterMenu/manage";
import SearchBar from "../../../components/SearchBar/index";
import CalendarIcon from '../../../../assets/svg/calendar.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge } from 'react-native-paper';
import MapView, { Marker, Circle } from 'react-native-maps';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Toast from 'react-native-toast-message'

import styles from './style';
import ENV from '../../../../env';

const apiUrl = ENV.API_URL;

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

interface CustomBadgeProps {
  text: string;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ text }) => {
  const badgeColor = getBadgeColor(text);

  return (
    <View style={{ alignItems: 'center' }}>
      <Badge style={{ backgroundColor: badgeColor }}>{text}</Badge>
    </View>
  );
};

const getBadgeColor = (text: string): string => {
  // Lógica para definir a cor com base no texto
  if (text === 'Atrasado') {
    return 'red'; // Cor vermelha para 'Exemplo1'
  } else if (text === 'Pontual') {
    return 'green'; // Cor verde para 'Exemplo2'
  } else {
    return 'blue'; // Cor azul para qualquer outro texto
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ taskData, index }) => {
  const isEvenIndex = index % 2 === 0;
  const cardColor = isEvenIndex ? '#FFD95A' : '#FFF7D4';
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const MapModal: React.FC = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
          }}>
            <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
            <Circle center={{ latitude: 0.0022, longitude: 0.0022 }} radius={80} />
          </MapView>

          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <View style={styles.column}>
        <Text style={styles.text}>{taskData.user_name}</Text>
        <Text style={styles.text}>Entrada ({taskData.tempo_inicial.padrao})</Text>
        <Text style={styles.text}>Inter. Iníc. ({taskData.intervalo_inicial.padrao})</Text>
        <Text style={styles.text}>Inter. Final ({taskData.intervalo_final.padrao})</Text>
        <Text style={styles.text}>Saída ({taskData.tempo_final.padrao})</Text>
      </View>
      <View style={styles.columnCenter}>
        <Text style={styles.text} />
        <TouchableOpacity onPress={() => handleIconPress()}>
          <Text style={styles.text}><Icon name="map-pin" size={20} color="black" /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress()}>
          <Text style={styles.text}><Icon name="map-pin" size={20} color="black" /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress()}>
          <Text style={styles.text}><Icon name="map-pin" size={20} color="black" /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress()}>
          <Text style={styles.text}><Icon name="map-pin" size={20} color="black" /></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.columnSecond}>
        <Text style={styles.text}>Jornada {taskData.tempo_total}</Text>
        <Text style={styles.text}><CustomBadge text={taskData.tempo_inicial.situacao} /> {taskData.tempo_inicial.real}</Text>
        <Text style={styles.text}><CustomBadge text={taskData.intervalo_inicial.situacao} /> {taskData.intervalo_inicial.real}</Text>
        <Text style={styles.text}><CustomBadge text={taskData.intervalo_final.situacao} /> {taskData.intervalo_final.real}</Text>
        <Text style={styles.text}><CustomBadge text={taskData.tempo_final.situacao} /> {taskData.tempo_final.real}</Text>
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
  const [formattedDate, setFormattedDate] = useState('');
  const [weekday, setWeekday] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (date: string, name?: string) => {
    try {
      setIsLoading(true);
      let url = `${apiUrl}/manager/point_presences?data=${date}`;

      if (name) {
        url += `&name=${name}`;
      }
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Houve um erro ao recarregar!'
        });
      }

      const data = await response.json();
      setJsonData(data);
      setData(date);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error)
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = parse(dateString, 'd-M-yyyy', new Date());
    const a = format(date, 'd/M/yyyy', { locale: ptBR });
    const b = format(date, 'EEEE', { locale: ptBR });
    setFormattedDate(a);
    setWeekday(b);
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    fetchData(formattedDate);
    formatDate(formattedDate)
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
    formatDate(formattedDate)
    handleCloseModal();
  };

  const Header: React.FC = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerIcon}>
        <Image
              style={styles.logo}
              source={require('../../../../assets/Logo.png')}
            />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{weekday}</Text>
        <View style={styles.headerDivider} />
        <Text style={styles.headerText}>{formattedDate}</Text>
      </View>
      <TouchableOpacity onPress={handleOpenModal} style={styles.headerIcon}>
          <CalendarIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.containerCard}>
            {jsonData.map((taskData, index) => (
              <TaskCard key={index} taskData={taskData} index={index} />
            ))}
          </View>
        </ScrollView>
      )}
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
