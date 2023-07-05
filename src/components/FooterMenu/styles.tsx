import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerFooter: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 180,
    height: '5%',
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
