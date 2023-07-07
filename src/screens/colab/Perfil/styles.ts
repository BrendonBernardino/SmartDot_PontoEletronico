import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerInvite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "100%",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Defina a largura desejada para o modal
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    width: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#C07F00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#4C3D3D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFD95A',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextInvite: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;