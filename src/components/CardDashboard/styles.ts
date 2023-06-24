import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "90%",
        height: 70,
        margin: "4%",
        borderRadius: 5,
        elevation: 10,
    },
    insideblock: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        marginLeft: "5%",
    },
    textcard: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 19,
        width: "40%",
        marginLeft: "5%",
    },
    result: {

    },
    textResult: {
        fontSize: 30,
        fontWeight:"bold",
        width: 130,
        textAlign: "right",
    }
});

export default styles;