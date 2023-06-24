import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    yellowSection: {
      flex: 1,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    nameLeft: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    nameRight: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    userInfo: {
      marginLeft: 20,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    userDescription: {
      fontSize: 16,
      marginTop: 5,
    },
    whiteSection: {
      flex: 3,
      backgroundColor: 'white',
      padding: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    rowText: {
      fontSize: 16,
      marginRight: 10,
    },
  });
  export default styles;