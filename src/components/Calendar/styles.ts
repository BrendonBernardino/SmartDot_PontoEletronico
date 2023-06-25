import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    calendar: {
        // flex: 0.50,
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,
        borderRadius: 10,
        width: 300,
        height: 250,
        elevation: 5,
    },
    monthContainer: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        width: '100%',
        // backgroundColor:"green"
    },
    arrow: {
        textAlign:'center',
        flex: 0.5,
        // backgroundColor: 'pink',
        fontSize: 15,
        marginHorizontal: 10,
    },
    month: {
        flex: 0.7,
        // backgroundColor: 'yellow',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign:'center'
        // marginHorizontal: '20%'
    },
    weekDayText: {
        // flex: 0.2,
        width: '14.28%',
        height: 23,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginBottom:'5%',
        // marginVertical: 5,
        // backgroundColor: 'lightgray',
    },
    calendarContainer: {
        flex: 1.2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: 280,
        // backgroundColor:"red",
        marginBottom: 80,
    },
    dayContainer: {
        width: '14.28%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 15,
        // backgroundColor: 'lightgray',
    },
    dayText: {
        flex: 0.9,
        fontSize: 16,
        // fontWeight:'bold',
        // backgroundColor:"green",
    },
});

export default styles;