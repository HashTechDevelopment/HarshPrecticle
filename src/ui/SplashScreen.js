import {useEffect} from 'react';
import {View, Text} from 'react-native';
import {AppScreens} from '../utilities/AppScreens';
import * as RootNavigation from '../utilities/RootNavigation';
import {appStyles, COLOR_BLACK} from '../utilities/styles';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      RootNavigation.forcePush(props, AppScreens.HomeScreen);
    }, 3000);
  }, []);

  return (
    <View
      style={[
        appStyles.mainContainer,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Text style={{fontSize: 30, color: COLOR_BLACK}}>Shopping cart</Text>
    </View>
  );
};

export default SplashScreen;
