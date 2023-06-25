import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerlayer: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        width: '100%',
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        width: '50%',
    },
    headerDivider: {
        backgroundColor: 'gray',
        height: 1,
        width: '80%',
        marginVertical: 4,
    },
    cardslayer: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
    },
    switchlayer: {
        flex: 0.15,
        alignItems: "flex-end",
        justifyContent: "center",
        width: "80%",
    },
    interval: {
        fontWeight: "bold",
        marginVertical: "2%",
    },
    statuslayer: {
        flex: 0.8,
        alignItems: "center",
        width: '100%'
    },
    optional1: {
        alignItems: "center",
        justifyContent: "flex-start",
        width: '100%',
        height:"50%",
    },
    cafeicon: {
        alignItems: "center",
        justifyContent: "center",
    },
    textJourney: {
        fontSize: 25,
        fontWeight:'bold',
    },
    horaminBlock: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        marginTop: "4%",
        width: "35%",
        borderRadius: 15,
    },
    textHoraMin: {
        fontSize: 20,
        fontWeight:'bold',
    },
    optional2: {
        flexDirection:'row',
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height:"30%",
    },
    modalMask: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%'
    },
    modalCalendar: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width:'100%', 
        height:'80%', 
        marginTop: '40%'
    },
    titleModal: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop:'2%',
        height:'5%',
    },
    map: {
        width: '90%',
        height: '20%',
        marginBottom: 150,
        borderRadius: 20,
    },
});

export default styles;