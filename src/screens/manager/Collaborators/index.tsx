import React, { useState, useEffect } from 'react';
import { Modal, Switch, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FooterMenu from "../../../components/FooterMenu/manage";
import SearchBar from "../../../components/SearchBar/index";
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  email: string;
  authentication_id: string,
  company_name: string,
  start_time: string,
  initial_interval: string,
  final_interval: string,
  final_time: string,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean
}


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

const TaskList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [startTimeHour, setStartTimeHour] = useState(0);
  const [startTimeMinute, setStartTimeMinute] = useState(0);
  const [initialIntervalHour, setInitialIntervalHour] = useState(0);
  const [initialIntervalMinute, setInitialIntervalMinute] = useState(0);
  const [finalIntervalHour, setFinalIntervalHour] = useState(0);
  const [finalIntervalMinute, setFinalIntervalMinute] = useState(0);
  const [finalTimeHour, setFinalTimeHour] = useState(0);
  const [finalTimeMinute, setFinalTimeMinute] = useState(0);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (name?: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      let url = `https://4577-2804-d4b-7aa4-c00-afd7-6192-7c16-a8f4.ngrok-free.app/manager/users`;

      if (name) {
        url += `?name=${name}`;
      }
      const response = await fetch(url, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const removeUser = async (userId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`https://4577-2804-d4b-7aa4-c00-afd7-6192-7c16-a8f4.ngrok-free.app/manager/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log('Error removing user:', error);
    }
  };

  const editUser = async (userId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`https://4577-2804-d4b-7aa4-c00-afd7-6192-7c16-a8f4.ngrok-free.app/manager/users?id=${userId}`,
      {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await response.json();

      setId(userData[0].id)
      setEmail(userData[0].email)
      setStartTimeHour(userData[0].start_time_hour)
      setStartTimeMinute(userData[0].start_time_minute);
      setInitialIntervalHour(userData[0].initial_interval_hour);
      setInitialIntervalMinute(userData[0].initial_interval_minute);
      setFinalIntervalHour(userData[0].final_interval_hour);
      setFinalIntervalMinute(userData[0].final_interval_minute);
      setFinalTimeHour(userData[0].final_time_hour);
      setFinalTimeMinute(userData[0].final_time_minute);
      setMonday(userData[0].monday);
      setTuesday(userData[0].tuesday);
      setWednesday(userData[0].wednesday);
      setThursday(userData[0].thursday);
      setFriday(userData[0].friday);
      setSaturday(userData[0].saturday);
      setSunday(userData[0].sunday);
    
      setModalVisible(true);
    } catch (error) {
      console.log('Error editing user:', error);
    }
  };

  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`https://4577-2804-d4b-7aa4-c00-afd7-6192-7c16-a8f4.ngrok-free.app/manager/users/${id}`,
      {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          start_time_hour: startTimeHour,
          start_time_minute: startTimeMinute,
          initial_interval_hour: initialIntervalHour,
          initial_interval_minute: initialIntervalMinute,
          final_interval_hour: finalIntervalHour,
          final_interval_minute: finalIntervalMinute,
          final_time_hour: finalTimeHour,
          final_time_minute: finalTimeMinute,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        }),
      });

      if (response.ok) {
        setModalVisible(false);
      }
    } catch (error) {
      console.log('Error editing user:', error);
    }
  };

  const addUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://4577-2804-d4b-7aa4-c00-afd7-6192-7c16-a8f4.ngrok-free.app/manager/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email,
          start_time_hour: startTimeHour,
          start_time_minute: startTimeMinute,
          initial_interval_hour: initialIntervalHour,
          initial_interval_minute: initialIntervalMinute,
          final_interval_hour: finalIntervalHour,
          final_interval_minute: finalIntervalMinute,
          final_time_hour: finalTimeHour,
          final_time_minute: finalTimeMinute,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        }),
      });

      if (response.ok) {
        setModalVisible(false);
      }

    } catch (error) {
      console.log('Error adding user:', error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
    setEmail('');
    setId('');
    setStartTimeHour(0);
    setStartTimeMinute(0);
    setInitialIntervalHour(0);
    setInitialIntervalMinute(0);
    setFinalIntervalHour(0);
    setFinalIntervalMinute(0);
    setFinalTimeHour(0);
    setFinalTimeMinute(0);
    setMonday(false);
    setTuesday(false);
    setWednesday(false);
    setThursday(false);
    setFriday(false);
    setSaturday(false);
    setSunday(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (name: string) => {
    fetchUsers(name);
  };

  const saveButton = () => {
    if (id && id.trim() !== "") {
      updateUser();
    } else{
      addUser();
    }
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.taskContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDescription}>{item.email}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => editUser(item.id)}>
          <Ionicons name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeUser(item.id)}>
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
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Usuário:</Text>
            <CustomTextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
              <CustomTextInput
                label="Entrada (Hora)"
                value={startTimeHour.toString()}
                onChangeText={(text) => {
                  const input = parseInt(text);
                  if (input >= 0 && input <= 23) {
                    setStartTimeHour(input);
                  }
                }}
              />
              </View>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  label="Entrada (Minuto)"
                  value={startTimeMinute.toString()}
                  onChangeText={(text) => {
                    const input = parseInt(text);
                    if (input >= 0 && input <= 59) {
                      setStartTimeMinute(input);
                    }
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <CustomTextInput
                  label="Intervalo Inicio (Hour)"
                  value={initialIntervalHour.toString()}
                  onChangeText={(text) => {
                    const input = parseInt(text);
                    if (input >= 0 && input <= 23) {
                      setInitialIntervalHour(input);
                    }
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  label="Intervalo Inic. (Minuto)"
                  value={initialIntervalMinute.toString()}
                  onChangeText={(text) => {
                    const input = parseInt(text);
                    if (input >= 0 && input <= 59) {
                      setInitialIntervalMinute(input);
                    }
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <CustomTextInput
                  label="Intervalo Final (Hora)"
                  value={finalIntervalHour.toString()}
                  onChangeText={(text) => {
                    const input = parseInt(text);
                    if (input >= 0 && input <= 23) {
                      setFinalIntervalHour(input);
                    }
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  label="Intervalo Final (Minuto)"
                  value={finalIntervalMinute.toString()}
                  onChangeText={(text) => {
                    const input = parseInt(text);
                    if (input >= 0 && input <= 59) {
                      setFinalIntervalMinute(input);
                    }
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <CustomTextInput
                  label="Saída (Hora)"
                  value={finalTimeHour.toString()}
                  onChangeText={(text) => {
                    const input = parseInt(text);
                    if (input >= 0 && input <= 23) {
                      setFinalTimeHour(input);
                    }
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  label="Saída (Minuto)"
                  value={finalTimeMinute.toString()}
                  onChangeText={(text) => {
                    const input = parseInt(text);
                    if (input >= 0 && input <= 59) {
                      setFinalTimeMinute(input);
                    }
                  }}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Segunda:</Text>
              <Switch value={monday} onValueChange={setMonday} />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Terça:</Text>
              <Switch value={tuesday} onValueChange={setTuesday} />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Quarta:</Text>
              <Switch value={wednesday} onValueChange={setWednesday} />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Quinta:</Text>
              <Switch value={thursday} onValueChange={setThursday} />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Sexta:</Text>
              <Switch value={friday} onValueChange={setFriday} />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Sábado:</Text>
              <Switch value={saturday} onValueChange={setSaturday} />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Domingo:</Text>
              <Switch value={sunday} onValueChange={setSunday} />
            </View>


            <TouchableOpacity onPress={saveButton} style={{ backgroundColor: '#c88f20', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal} style={{ marginTop: 10 }}>
              <Text style={{ color: 'blue', textAlign: 'center' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={openModal}
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

export default TaskList;
