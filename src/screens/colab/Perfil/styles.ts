import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  yellowSection: {
    flex: 1,
  },
  topRow: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    // backgroundColor:"pink"
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
    // marginHorizontal: '10%',
  },
  bottomRow: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    // backgroundColor:"gray"
  },
  userInfo: {
    flex: 1,
    marginLeft: 20,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 16,
    // marginTop: 5,
  },
  whiteSection: {
    flex: 2,
    backgroundColor: 'white',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  seta: {
    // flex:1,
  },
  settings: {
    flex: 3,
  },
  LogoutLayer: {
    flex: 1.2,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginVertical: "0%",
    width: "100%"
  },
  logo: {
    height: 60,
    width: 60,
    marginBottom:"4%",
  },
  LogoutButton: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: "40%",
    width: 160,
    borderRadius: 20,
    elevation: 5,
  },
  LogoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    // margin: "0%",
  }
});
export default styles;