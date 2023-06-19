import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    themeBar: {
      flex:0.35,
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      width: "80%",
    },
    themeCard: {
      flex: 0.5,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-around',
      width: "30%",
      marginTop: "7%",
      marginBottom: "0%",
      borderRadius: 12,
      // shadowColor: "black",
      // shadowOpacity: 0.8,
      // shadowOffset: {width: 5, height: 5},
      // shadowRadius: 6,
      elevation: 10,
    },
    top: {
      flex: 0.9,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: "100%",
    },
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 111,
      height: 111,
      marginVertical: 10,
    },
    title: {
      flex: 0.4,
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 35,
      fontWeight: "bold"
    },
    buttons: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: "100%",
    },
    buttom: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: "2%",
      width: "65%",
      height: "10%",
      borderRadius: 20
    },
    info: {
      flex: 0.95,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  });

  export default styles;