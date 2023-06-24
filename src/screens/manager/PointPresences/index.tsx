import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Calendar from "../../../components/Calendar/index";
import FooterMenu from "../../../components/FooterMenu/manage";
import SearchBar from "../../../components/SearchBar/index";

interface TaskCardProps {
  leftName: string;
  rightName: string;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ leftName, rightName, index }) => {
  const isEvenIndex = index % 2 === 0;
  const cardColor = isEvenIndex ? '#FFD95A' : '#FFF7D4';

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <View style={styles.column}>
        <Text style={styles.text}>{leftName}</Text>
        <Text style={styles.text}>{leftName}</Text>
        <Text style={styles.text}>{leftName}</Text>
        <Text style={styles.text}>{leftName}</Text>
        <Text style={styles.text}>{leftName}</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>{rightName}</Text>
        <Text style={styles.text}>{rightName}</Text>
        <Text style={styles.text}>{rightName}</Text>
        <Text style={styles.text}>{rightName}</Text>
        <Text style={styles.text}>{rightName}</Text>
      </View>
    </View>
  );
};


const TaskList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSearch = () => {
    // Implementar a lógica de pesquisa aqui
  };

  const handleDatePress = (date: number) => {
    console.log('Data clicada:', date);
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
        <Image
            style={styles.iconFooter}
            source={require('../../../../assets/calendar.svg')}
          />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />

      <View style={styles.containerCard}>
        <TaskCard leftName="Tarefa 1" rightName="Nome 1" index={0}/>
        <TaskCard leftName="Tarefa 2" rightName="Nome 2" index={1}/>
        <TaskCard leftName="Tarefa 3" rightName="Nome 3" index={2}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  containerCard: {
    flex: 1,
    padding: 16,
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
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  iconFooter: {
    marginHorizontal: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFD95A',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
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
  containerCalendar: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  month: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekDayText: {
    width: '14.28%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    textColor: 'lightgray',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: 280,
  },
  dayContainer: {
    width: '14.28%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: 'lightgray',
  },
  dayText: {
    fontSize: 16,
  },
});

export default TaskList;
