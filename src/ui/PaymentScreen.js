import {Image, Text, TouchableOpacity, View} from 'react-native';
import {AppScreens} from '../utilities/AppScreens';
import {Images} from '../utilities/Images';
import * as RootNavigation from '../utilities/RootNavigation';
import {appStyles, COLOR_BLACK} from '../utilities/styles';

const PaymentScreen = props => {
  return (
    <View
      style={[
        appStyles.mainContainer,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Image
        source={Images.paymnet_completed}
        style={{height: 150, width: 150, resizeMode: 'center'}}
      />

      <Text
        style={{
          fontSize: 18,
          color: COLOR_BLACK,
          lineHeight: 25,
          marginTop: 50,
          fontWeight: '600',
        }}>{`Payment Completed Successfully`}</Text>

      <TouchableOpacity
        onPress={() => RootNavigation.forcePush(props, AppScreens.HomeScreen)}
        style={{
          paddingHorizontal: 20,
          backgroundColor: '#98D9B6',
          paddingVertical: 10,
          borderRadius: 50,
          marginTop: 30,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: COLOR_BLACK,
            fontWeight: '600',
          }}>{`Go To Home`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
