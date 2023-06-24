import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerlayer: {
        flex: 0.3,
        // backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        width: '100%',
    },
    header: {
        // flex: 0.3,
        // backgroundColor: "blue",
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
        // backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
    switchlayer: {
        flex: 0.15,
        alignItems: "flex-end",
        justifyContent: "center",
        width: "80%",
        // backgroundColor: "blue",
    },
    interval: {
        fontWeight: "bold",
        marginVertical: "2%",
        // flex: 0.4,
        // alignItems: "flex-end",
        // justifyContent: "center",
        // width: "80%",
        // backgroundColor: "blue",
    },
    statuslayer: {
        flex: 0.8,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;