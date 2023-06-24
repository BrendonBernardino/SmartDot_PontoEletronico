import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerlayer: {
        flex: 0.3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"10%",
        width: '100%',
    },
    viewbloco: {
        flex: 0.8, 
        alignItems: "center"
    },
    block: {
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        width: 80,
        borderRadius: 5,
        elevation: 5
    },
    viewlogo: {
        flex: 1, 
        alignItems: "center"
    },
    logo: {
        height: 60,
        width: 60,
    },
    viewreload: {
        flex: 0.8, 
        alignItems: "center"
    },
    reload: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft:"25%",
    },
    sincronizedlayer: {
        flex: 0.1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardslayer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        width: '100%',
        marginTop:"10%",
    },
});

export default styles;