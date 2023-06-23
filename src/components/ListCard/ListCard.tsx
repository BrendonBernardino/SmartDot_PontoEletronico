import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskCardProps {
  leftName: string;
  rightName: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ leftName, rightName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.column}>
        <Text style={styles.text}>{leftName}</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.line} />
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>{rightName}</Text>
      </View>
    </View>
  );
};

const TaskList = () => {
  return (
    <View style={styles.container}>
      <TaskCard leftName="Tarefa 1" rightName="Nome 1" />
      <TaskCard leftName="Tarefa 2" rightName="Nome 2" />
      <TaskCard leftName="Tarefa 3" rightName="Nome 3" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
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
});

export default TaskList;
