import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppScreens} from '../utilities/AppScreens';
import {Images} from '../utilities/Images';
import * as RootNavigation from '../utilities/RootNavigation';
import {appStyles, COLOR_BLACK, COLOR_WHITE} from '../utilities/styles';
import {useDispatch, useSelector} from 'react-redux';
import {clearAllData} from '../redux/actions';
const CartScreen = props => {
  const {carts, cart_total} = useSelector(state => state.appReducers);
  const dispatch = useDispatch();

  // Navigation Bar
  React.useLayoutEffect(() => {
    props.navigation.setOptions(
      {
        headerShown: true,
        headerTitleAlign: 'left',
        headerStyle: {
          borderBottomColor: '#D9D9D9',
          borderBottomWidth: 1,
        },
        headerTitle: () => (
          <Text style={appStyles.actionbarTitle}>{`My Cart`}</Text>
        ),

        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => RootNavigation.goBack()}
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Image
              source={Images.back_button}
              style={{height: 30, resizeMode: 'contain', aspectRatio: 1}}
            />
          </TouchableOpacity>
        ),
      },

      [props.navigation],
    );
  });

  // Main Ui
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <FlatList
          data={carts}
          ItemSeparatorComponent={
            <Image style={{height: 2, backgroundColor: '#e2e2e2'}} />
          }
          renderItem={({item, index}) => <CartItem item={item} index={index} />}
        />
      </ScrollView>

      <View
        style={{
          backgroundColor: COLOR_BLACK,
          paddingVertical: 20,
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          borderRadius: 20,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: COLOR_WHITE,
            }}>
            Total Payable Amount
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: COLOR_WHITE,
              marginTop: 10,
            }}>
            ₹{cart_total}/-
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch(clearAllData());
            RootNavigation.forcePush(props, AppScreens.PaymentScreen);
          }}
          style={{
            backgroundColor: COLOR_WHITE,
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 50,
          }}>
          <Text style={{fontWeight: '800', color: COLOR_BLACK}}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

// Cart Item Component
const CartItem = props => {
  return (
    <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={{uri: props?.item?.image}}
        style={{width: 100, aspectRatio: 1, resizeMode: 'contain'}}
      />

      <View style={{flex: 1, paddingStart: 20}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: COLOR_BLACK,
            lineHeight: 19,
          }}
          numberOfLines={2}>
          {props?.item?.title}
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: COLOR_BLACK,
            lineHeight: 20,
            marginTop: 10,
          }}>
          {props?.item?.price} X {props?.item?.item_count} = ₹
          {props?.item?.price * props?.item?.item_count}/-
        </Text>
      </View>
    </View>
  );
};
