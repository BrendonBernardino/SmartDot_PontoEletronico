import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    restlayer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    worklayer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
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
        height: "55%",
    },
    cafeicon: {
        alignItems: "center",
        justifyContent: "center",
    },
    textJourney: {
        fontSize: 25,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
    },
    optional2: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: "20%",
    },
    modalMask: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    modalCalendarContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        height: '80%',
        marginTop: '40%'
    },
    modalPontoContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: '100%',
        height: '60%',
        marginTop: '80%'
    },
    titleModal: {
        fontSize: 25,
        fontWeight: "bold",
        position: 'absolute',
        top: 20,
        height: '5%',
    },
    map1: {
        width: '90%',
        height: '20%',
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 20,
    },
    map2: {
        width: '70%',
        height: '30%',
        marginBottom: 20,
        borderRadius: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addressText: {
        flex: 1,
        marginRight: 10,
    },
    bottomRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    periodoTrabalhoText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },
    intervaloText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topLeftText: {
        position: 'absolute',
        top: 40,
        left: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    topRightText: {
        position: 'absolute',
        top: 40,
        right: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    pin: {
        position: 'absolute',
        bottom: 170,
        right: 15,
    },
    fingerprint: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 100,
        borderWidth: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
    },
    modalListContainer: {
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 180,
        backgroundColor: 'white',
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    messageText: {
        flex: 1,
        marginRight: 10,
        fontSize: 16,
    },
});

export default styles;