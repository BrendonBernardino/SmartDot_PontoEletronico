import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logolayer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  logo: {
    // flex: 0.325,
    alignItems: 'center',
    justifyContent: 'center',
    width: 111,
    height: 111,
  },
  midlayer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  loginlayer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "100%",
    // paddingBottom: "40%",
  },
  infolayer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'blue',
  }
});

export default styles;