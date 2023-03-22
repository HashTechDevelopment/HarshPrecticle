import {StyleSheet} from 'react-native';

export const COLOR_WHITE = '#fff';
export const COLOR_BLACK = '#000';
export const COLOR_GRAY = '#828282';

export const appStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
  },
  actionbarTitle: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: COLOR_BLACK,
    fontWeight: '600',
  },
});
