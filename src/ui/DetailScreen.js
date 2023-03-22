import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../utilities/Images';
import * as RootNavigation from '../utilities/RootNavigation';
import {
  appStyles,
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
} from '../utilities/styles';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, ADD_TO_CART} from '../redux/actions';
import {AppScreens} from '../utilities/AppScreens';
import {ToastMessage} from '../utilities/functions';

const DetailScreen = props => {
  const {carts} = useSelector(state => state.appReducers);
  var product = props?.route?.params;
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
          <Text style={appStyles.actionbarTitle}>{`Product Detail`}</Text>
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

        headerRight: () => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (carts?.length == 0) {
                ToastMessage(`Cart is empty...!!! please add item to view`);
              } else RootNavigation.navigate(AppScreens.CartScreen);
            }}
            style={{
              height: '100%',
              width: 50,
              marginHorizontal: 5,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Image
                source={Images.cart}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  tintColor: 'green',
                }}
              />
            </View>

            {carts?.length == 0 ? (
              <></>
            ) : (
              <Text
                style={{
                  backgroundColor: COLOR_BLACK,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  borderRadius: 10,
                  color: COLOR_WHITE,
                  textAlign: 'center',
                  fontSize: 10,
                  marginTop: 5,
                  textAlignVertical: 'center',
                  alignSelf: 'flex-end',
                }}>
                {carts?.length}
              </Text>
            )}
          </TouchableOpacity>
        ),
      },

      [props.navigation, product],
    );
  });

  return (
    <SafeAreaView style={appStyles.mainContainer}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        style={[appStyles.mainContainer, {flex: 1}]}
        showsVerticalScrollIndicator={false}>
        <View style={appStyles.mainContainer}>
          <Image
            source={{uri: product?.image}}
            style={{aspectRatio: 1, margin: 10, resizeMode: 'contain'}}
          />

          <Text
            style={{
              margin: 10,
              fontWeight: '800',
              color: COLOR_BLACK,
              fontSize: 18,
            }}>
            {product?.title}
          </Text>

          <Text
            style={{
              marginHorizontal: 10,
              fontWeight: '600',
              color: COLOR_GRAY,
              textTransform: 'capitalize',
              fontSize: 16,
            }}>
            {product?.category}
          </Text>

          <Text
            style={{
              margin: 10,
              fontWeight: '800',
              color: COLOR_BLACK,
              fontSize: 18,
            }}>
            ₹{product?.price}/-
          </Text>

          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <Image
              source={Images.rating_star}
              style={{height: 20, width: 20, resizeMode: 'center'}}
            />
            <Text
              style={{marginHorizontal: 10, fontSize: 16, fontWeight: '600'}}>
              {product?.rating?.rate} ({product.rating?.count})
            </Text>
          </View>

          <Text
            style={{
              marginTop: 20,
              marginHorizontal: 10,
              fontWeight: '800',
              color: COLOR_BLACK,
              fontSize: 18,
            }}>
            Description
          </Text>
          <Text
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              lineHeight: 20,
              color: COLOR_GRAY,
              textTransform: 'capitalize',
              fontSize: 14,
            }}>
            {product?.description}
          </Text>
        </View>
      </ScrollView>

      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            dispatch(addToCart(carts, product));
          }}
          activeOpacity={1}
          style={{
            height: 50,
            backgroundColor: COLOR_BLACK,
            borderRadius: 30,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLOR_WHITE,
              fontWeight: '600',
              fontSize: 15,
            }}>
            {`Add To Cart`}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DetailScreen;
