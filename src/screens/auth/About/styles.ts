import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toplayer: {
        flex: 0.10,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        backgroundColor: "gray",
    },
    back: {
        flex: 0.1, 
        justifyContent: 'flex-start', 
        fontSize: 25, 
        marginRight: "0%", 
        // backgroundColor: "pink"
    },
    title: {
        flex: 0.25,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        // elevation: 1,
        // backgroundColor: "pink",
    },
    logo: {
        flex: 0.1,
        height: "27%",
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
        backgroundColor: "pink",
    },
    logoufc: {
        flex: 0.5,
        width: "12%",
    },
    descriptionlayer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "blue",
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
        backgroundColor: "yellow",
    },
    photo: {
        flex: 0.2,
        height: "100%",
        borderRadius: 50
    },
    githublayer: {
        flex: 0.2,
        backgroundColor: "green",
    }
});

export default styles;