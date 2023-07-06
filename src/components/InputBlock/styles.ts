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
        flex: 0.7, 
        width: "80%", 
        fontSize: 15, 
        fontWeight: "bold", 
        marginLeft: "10%",
        flexDirection: "row",
        // backgroundColor: "pink",
    },
    layerButton: {
        flex: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        // backgroundColor: "pink",
    },
    eye: {
        marginRight: '5%',
        width: '10%',
        // backgroundColor: "pink",
    }
});

export default styles;