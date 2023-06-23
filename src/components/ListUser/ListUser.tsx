import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const handleRemoveTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: number) => {
    // Implemente a lógica de edição da tarefa com base no ID aqui
    console.log(`Editar tarefa com ID ${taskId}`);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginButton: 8,
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
});

export default TaskList;
