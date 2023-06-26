import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles"

interface CalendarProps {
  onDatePress: (date: { day: number, month: number, year: number }) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDatePress }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendarDays = () => {
    const calendarDays: JSX.Element[] = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    {weekdays.map((weekday) => (
      calendarDays.push(
            <View key={weekday} style={styles.weekDayText}>
              <Text style={styles.dayText}>{weekday}</Text>
            </View>
      )
    ))}

    const emptyDaysCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Preencher os dias anteriores com espaços em branco
    for (let i = 0; i < emptyDaysCount; i++) {
      calendarDays.push(<View key={`empty-${i}`} style={styles.dayContainer} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <TouchableOpacity
          key={day}
          style={styles.dayContainer}
          onPress={() => onDatePress({ day, month: currentMonth, year: currentYear })}
          >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return calendarDays;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth - 1);
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth + 1);
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.arrow}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.month}>{monthName} {currentYear}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
     
      <View style={styles.calendarContainer}>
        {renderCalendarDays()}
      </View>
    </View>
  );
};

export default Calendar;
