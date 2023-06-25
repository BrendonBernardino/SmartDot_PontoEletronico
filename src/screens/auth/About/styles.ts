import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toplayer: {
        flex: 0.1,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
    },
    back: {
        justifyContent: 'flex-start', 
        fontSize: 25, 
        marginRight: "0%", 
    },
    title: {
        flex: 0.30,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        elevation: 0,
        // backgroundColor: "pink",
    },
    logo: {
        flex: 0.1,
        height: "48%",
        // paddingRight: "0%", 
        // width: "5%",
        // backgroundColor: "pink",
        // marginHorizontal: "5%",
    },
    ufclayer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "10%",
        // backgroundColor: "pink",
    },
    logoufc: {
        flex: 0.5,
        width: "12%",
    },
    descriptionlayer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "blue",
    },
    text: {
        flex: 0.35,
        fontSize: 15,
        fontWeight: "bold",
        width: "85%",
    },
    photoslayer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row",
        // backgroundColor: "yellow",
    },
    photo: {
        flex: 0.2,
        height: "100%",
        borderRadius: 50
    },
    githublayer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row",
        // backgroundColor: "green",
    }
});

export default styles;