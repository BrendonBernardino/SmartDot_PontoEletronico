import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles"
import { AntDesign } from '@expo/vector-icons';

interface CalendarProps {
    onDatePress: (date: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDatePress }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const [languageType, setLanguageType] = useState(true);

    const renderCalendarDays = () => {
        const calendarDays: JSX.Element[] = [];
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekdaysPT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        if (languageType == false) {
            weekdays.map((weekday) => (
                calendarDays.push(
                    <View key={weekday} style={styles.weekDayText}>
                        <Text style={[styles.dayText, {color: '#83908D'}]}>{weekday}</Text>
                    </View>
                )
            ))
        }
        else {
            weekdaysPT.map((weekday) => (
                calendarDays.push(
                    <View key={weekday} style={styles.weekDayText}>
                        <Text style={[styles.dayText, {color: '#83908D'}]}>{weekday}</Text>
                    </View>
                )
            ))
        }

        // const emptyDaysCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        const emptyDaysCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek;

        // Preencher os dias anteriores com espaços em branco
        for (let i = 0; i < emptyDaysCount; i++) {
            calendarDays.push(<View key={`empty-${i}`} style={styles.dayContainer} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(
                <TouchableOpacity
                    key={day}
                    style={styles.dayContainer}
                    onPress={() => onDatePress(day)}
                >
                    <Text style={[styles.dayText, {fontWeight:'bold'}]}>{day}</Text>
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

    const monthName = new Date(currentYear, currentMonth).toLocaleString(languageType == true ? 'PT' : 'EN', { month: 'long' });

    return (
        <View style={styles.container}>
            <View style={[styles.calendar, { backgroundColor: '#FFF7D4' }]}>
                <View style={styles.monthContainer}>
                    <TouchableOpacity onPress={goToPreviousMonth}>
                        <AntDesign style={styles.arrow} name='left' />
                    </TouchableOpacity>
                    <Text style={styles.month}>{monthName} {currentYear}</Text>
                    <TouchableOpacity onPress={goToNextMonth}>
                        <AntDesign style={styles.arrow} name='right' />
                    </TouchableOpacity>
                </View>

                <View style={styles.calendarContainer}>
                    {renderCalendarDays()}
                </View>
            </View>
        </View>
    );
};

export default Calendar;