import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles"
import { AntDesign } from '@expo/vector-icons';

interface CalendarProps {
    onDatePress: (date: { day: number, month: number, year: number }) => void;
    selectedDay: number;
}

const Calendar: React.FC<CalendarProps> = ({ onDatePress, selectedDay }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const [languageType, setLanguageType] = useState(true);

    const renderCalendarDays = () => {
        const calendarDays: JSX.Element[] = [];
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekdaysPT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        const selectedDayStyle = { // Estilos para o dia selecionado
            fontWeight: 'bold',
            color: '#C07F00',
            // backgroundColor: '#FFFF00'
        };

        const normalDayStyle = { // Estilos para os dias normais
            fontWeight: 'bold',
            color: '#000000'
        };

        if (languageType == false) {
            weekdays.map((weekday) => (
                calendarDays.push(
                    <View key={weekday} style={styles.weekDayText}>
                        <Text style={[styles.dayText, { color: '#83908D' }]}>{weekday}</Text>
                    </View>
                )
            ))
        }
        else {
            weekdaysPT.map((weekday) => (
                calendarDays.push(
                    <View key={weekday} style={styles.weekDayText}>
                        <Text style={[styles.dayText, { color: '#83908D' }]}>{weekday}</Text>
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
            const isDaySelected = day === selectedDay;
            const dayStyle = isDaySelected ? selectedDayStyle : normalDayStyle;

            calendarDays.push(
                <TouchableOpacity
                    key={day}
                    style={styles.dayContainer}
                    onPress={() => onDatePress({ day, month: currentMonth, year: currentYear })}
                >
                    <Text style={[styles.dayText, dayStyle]}>{day}</Text>
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