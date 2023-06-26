import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  taskName: {
    fontSize: 16,
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  taskDeadline: {
    fontSize: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: 'gray',
    height: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerIcon: {
    padding: 10,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerDivider: {
    backgroundColor: 'gray',
    height: 1,
    width: '80%',
    marginVertical: 4,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 4,
  },
  containerFooter: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    width: '60%',
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  iconFooter: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 30,
  },
  searchContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  searchButton: {
    padding: 8,
  },
  searchIconContainer: {
    backgroundColor: '#4C3D3D',
    borderRadius: 50,
    padding: 8,
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
    width: 40,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Defina a largura desejada para o modal
  },
});

export default styles;
