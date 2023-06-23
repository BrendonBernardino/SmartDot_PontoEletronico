import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logolayer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5%",
    // backgroundColor: 'blue',
  },
  logo: {
    // flex: 0.325,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  midlayer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    // backgroundColor: 'pink',
  },
  registerlayer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "100%",
    // backgroundColor: 'blue',
    // paddingBottom: "40%",
  },
  infolayer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'blue',
  }
});

export default styles;