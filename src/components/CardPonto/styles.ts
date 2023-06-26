import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        flexDirection: "row",
    },
    textplanned: {
        textAlign: "center",
        width: "20%",
        fontSize: 15,
    },
    textPonto: {
        textAlign: "center",
        fontWeight: "bold",
        width: 90,
        fontSize: 22,
    },
    cardBaterPonto: {
        flex:0.6,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 15,
        width: '115%',
        height: '70%',
        // elevation: 5,
    },
    buttonBaterPonto: {
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 15,
        width: '100%',
        height: '70%',
        elevation: 5,
    },
    textBaterPonto: {
        fontSize: 15,
    },
});

export default styles;