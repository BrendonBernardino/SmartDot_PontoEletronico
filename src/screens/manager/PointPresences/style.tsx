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
  },
});

export default styles;
