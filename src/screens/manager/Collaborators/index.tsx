import React, { useState, useEffect } from 'react';
import { Modal, Switch, ScrollView, ActivityIndicator, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import FooterMenu from "../../../components/FooterMenu/manage";
import SearchBar from "../../../components/SearchBar/index";
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../../../../env';
import Toast from 'react-native-toast-message'

const apiUrl = ENV.API_URL;

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (name?: string) => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      let url = `${apiUrl}/manager/users`;

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
      Toast.show({
        type: 'error',
        text1: String(error)
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeUser = async (userId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`${apiUrl}/manager/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      setUsers(users.filter((user) => user.id !== userId));
      Toast.show({
        type: 'success',
        text1: 'Usuário removido!'
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error)
      });
    }
  };

  const editUser = async (userId: number) => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${apiUrl}/manager/users?id=${userId}`,
      {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await response.json();

      if (response.ok) {
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
      } else {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível recarregar'
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error)
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${apiUrl}/manager/users/${id}`,
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
        Toast.show({
          type: 'success',
          text1: 'Atualizado com sucesso'
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível recarregar'
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error)
      });
    }
  };

  const addUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${apiUrl}/manager/users`, {
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
        Toast.show({
          type: 'success',
          text1: 'Convidado com sucesso'
        })
        fetchUsers();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível adicionar'
        })
      }

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error)
      });
    }
  };

  const resetUser = async (userId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${apiUrl}/manager/users/${userId}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Resetado com sucesso'
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível resetar'
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error)
      });
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

  const renderItem = (item: User) => (
    <View style={styles.taskContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDescription}>{item.email}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconItem} onPress={() => resetUser(item.id)}>
          <Ionicons name="reload-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconItem} onPress={() => editUser(item.id)}>
          <Icon name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconItem} onPress={() => removeUser(item.id)}>
          <Icon name="trash" size={24} color="black" />
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

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          {users.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem(item)}
              <View style={styles.divider} />
            </React.Fragment>
          ))}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.formTitle}>Usuário:</Text>
              <CustomTextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
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
                <View style={styles.columnContainer}>
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

              <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                  <CustomTextInput
                    label="Interv. Inicio (Hora)"
                    value={initialIntervalHour.toString()}
                    onChangeText={(text) => {
                      const input = parseInt(text);
                      if (input >= 0 && input <= 23) {
                        setInitialIntervalHour(input);
                      }
                    }}
                  />
                </View>
                <View style={styles.columnContainer}>
                  <CustomTextInput
                    label="Interv. Inic. (Minuto)"
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

              <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                  <CustomTextInput
                    label="Interv. Final (Hora)"
                    value={finalIntervalHour.toString()}
                    onChangeText={(text) => {
                      const input = parseInt(text);
                      if (input >= 0 && input <= 23) {
                        setFinalIntervalHour(input);
                      }
                    }}
                  />
                </View>
                <View style={styles.columnContainer}>
                  <CustomTextInput
                    label="Interv. Final (Minuto)"
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

              <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
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
                <View style={styles.columnContainer}>
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

              <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>Segunda:</Text>
                    <Switch value={monday} onValueChange={setMonday} />
                  </View>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>Quarta:</Text>
                    <Switch value={wednesday} onValueChange={setWednesday} />
                  </View>
                </View>
                <View style={styles.columnContainer}>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>Terça:</Text>
                    <Switch value={tuesday} onValueChange={setTuesday} />
                  </View>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>Quinta:</Text>
                    <Switch value={thursday} onValueChange={setThursday} />
                  </View>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>Sexta:</Text>
                    <Switch value={friday} onValueChange={setFriday} />
                  </View>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>Domingo:</Text>
                    <Switch value={sunday} onValueChange={setSunday} />
                  </View>
                </View>
                <View style={styles.columnContainer}>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>Sábado:</Text>
                    <Switch value={saturday} onValueChange={setSaturday} />
                  </View>
                </View>
              </View>


              <TouchableOpacity onPress={saveButton} style={styles.saveButton}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
