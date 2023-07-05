import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  containerCard: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
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
    fontSize: 20,
    marginBottom: 4,
    color: "#C07F00",
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Cor do sombreamento
    textShadowOffset: { width: 1, height: 1 }, // Deslocamento do sombreamento
    textShadowRadius: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFD95A',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  column: {
    flex: 2,
    alignItems: 'flex-start',
  },
  columnCenter: {
    flex: 1,
    alignItems: 'center',
  },
  columnSecond: {
    flex: 2,
    alignItems: 'flex-end',
  },
  line: {
    height: 1,
    width: '50%',
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  map: {
    // minHeight : '20%',
    width: '90%',
    height: '20%',
    marginBottom: 150,
    borderRadius: 20,
  }
});

export default styles;
