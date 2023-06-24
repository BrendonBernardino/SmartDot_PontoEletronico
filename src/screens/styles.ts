import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerFooter: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    width: 180,
    height: '5%',
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
  }
});

export default styles;