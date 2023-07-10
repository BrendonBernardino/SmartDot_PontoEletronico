import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttom: {
        alignItems: 'center',
        // flexDirection: "row",
        justifyContent: 'center',
        marginVertical: "2%",
        width: "65%",
        height: "10%",
        borderRadius: 20,
    },
    input: {
        flex: 1, 
        width: "100%", 
        fontSize: 15, 
        fontWeight: "bold", 
        marginLeft: "10%",
        flexDirection: "row",
    },
    layerButton: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    eye: {
        paddingVertical: '5.5%',
        marginRight: '5%',
        width: '10%',
    }
});

export default styles;