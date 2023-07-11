import React, { useState, useEffect } from 'react';
import { Modal, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import Loading from '../../../components/Loading/Loading';

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
  if (text === 'Atrasado') {
    return 'red';
  } else if (text === 'Pontual') {
    return 'green';
  } else if (text === 'Aguardando') {
    return 'gray';
  } else {
    return 'blue';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ taskData, index }) => {
  const isEvenIndex = index % 2 === 0;
  const cardColor = isEvenIndex ? '#FFD95A' : '#FFF7D4';
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [localName, setLocalName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconPress = (map_latitude: string, map_longitude: string, map_local_name: string) => {
    setModalVisible(true);
    setLatitude(map_latitude)
    setLongitude(map_longitude)
    setLocalName(map_local_name)
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    console.log('close modal')
  };

  const MapModal: React.FC = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={[styles.modalMask, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={[styles.modalPontoContent, { backgroundColor: '#fff' }]}>
        {latitude == '' || longitude == '' || localName == '' ? (
          <Text style={{ color: 'black', textAlign: 'center' }}>Aguardando</Text>
        ) : (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}>

              <Marker
                coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
              />
            </MapView>
          )}
          <Text style={{ color: 'black', textAlign: 'center' }}>{localName}</Text>

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
        <TouchableOpacity onPress={() => handleIconPress(taskData.tempo_inicial.latitude, taskData.tempo_inicial.longitude, taskData.tempo_inicial.local_name)}>
          <Text style={styles.text}><Icon name="map-pin" size={20} color="black" /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress(taskData.intervalo_inicial.latitude, taskData.intervalo_inicial.longitude, taskData.intervalo_inicial.local_name)}>
          <Text style={styles.text}><Icon name="map-pin" size={20} color="black" /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress(taskData.intervalo_final.latitude, taskData.intervalo_final.longitude, taskData.intervalo_final.local_name)}>
          <Text style={styles.text}><Icon name="map-pin" size={20} color="black" /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress(taskData.tempo_final.latitude, taskData.tempo_final.longitude, taskData.tempo_final.local_name)}>
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

interface TaskListProps { }

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
        const errorResponse = await response.json();
        const errorMessage = errorResponse.errors;
        
        Toast.show({
            type: 'error',
            text1: errorMessage || 'Não foi possível recarregar'
        })
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
    console.log(formattedDate);
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
    // <View style={styles.headerContainer}>
    // <TouchableOpacity style={styles.headerIcon}>
    //   <Image
    //         style={styles.logo}
    //         source={require('../../../../assets/Logo.png')}
    //       />
    // </TouchableOpacity>
    //   <View style={styles.headerTextContainer}>
    //     <Text style={styles.headerText}>{weekday}</Text>
    //     <View style={styles.headerDivider} />
    //     <Text style={styles.headerText}>{formattedDate}</Text>
    //   </View>
    //   <TouchableOpacity onPress={handleOpenModal} style={styles.headerIcon}>
    //       <CalendarIcon width={30} height={30} />
    //   </TouchableOpacity>
    // </View>
    <View style={styles.headerlayer}>
      <TouchableOpacity style={styles.headerIcon}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/Logosvg_1.png')}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 25, color: "#C07F00" }}>PONTOS BATIDOS</Text>
        <View style={styles.headerDivider} />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{weekday}, {formattedDate}</Text>
      </View>
      <TouchableOpacity onPress={handleOpenModal}>
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
          <Loading />
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
