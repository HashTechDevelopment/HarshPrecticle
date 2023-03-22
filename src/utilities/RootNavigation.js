import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../ui/HomeScreen';
import SplashScreen from '../ui/SplashScreen';
import {AppScreens} from './AppScreens';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import ProductScreen from '../ui/ProductScreen';
import DetailScreen from '../ui/DetailScreen';
import CartScreen from '../ui/CartScreen';
import PaymentScreen from '../ui/PaymentScreen';

const Stack = createStackNavigator();

export const navigationRef = React.createRef();
export const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name={AppScreens.SplashScreen} component={SplashScreen} />

        <Stack.Screen name={AppScreens.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={AppScreens.DetailScreen} component={DetailScreen} />
        <Stack.Screen
          name={AppScreens.ProductScreen}
          component={ProductScreen}
        />
        <Stack.Screen name={AppScreens.CartScreen} component={CartScreen} />
        <Stack.Screen
          name={AppScreens.PaymentScreen}
          component={PaymentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const goBack = () => {
  navigationRef.current.goBack();
};

export function goToRoot() {
  navigationRef.current.navigate(AppScreens.SplashScreen);
}

export function forcePush(props, screenName, data) {
  props?.navigation?.reset({
    index: 0,
    routes: [{name: screenName}],
  });
}
