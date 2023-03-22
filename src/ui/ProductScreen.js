import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Constance} from '../services/constants';
import {callApi, RequestMethod} from '../services/ServiceManager';
import {AppScreens} from '../utilities/AppScreens';
import {printLog, ToastMessage} from '../utilities/functions';
import {Images} from '../utilities/Images';
import * as RootNavigation from '../utilities/RootNavigation';
import {
  appStyles,
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
} from '../utilities/styles';
import {useDispatch, useSelector} from 'react-redux';

const ProductScreen = props => {
  var category = props?.route?.params;
  const {carts} = useSelector(state => state.appReducers);
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    callApi(
      `${Constance.GET_PRODUCTS_BY_CATEGORY}${category}`,
      RequestMethod.get,
      {},
      onLoading => {},
      onSuccess => {
        printLog(onSuccess);
        setProducts(onSuccess);
      },
      onFailure => {},
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Navigation Bar
  React.useLayoutEffect(() => {
    props.navigation.setOptions(
      {
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomColor: '#D9D9D9',
          borderBottomWidth: 1,
        },
        headerTitle: () => (
          <Text style={appStyles.actionbarTitle}>{category}</Text>
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

      [props.navigation, category],
    );
  });

  return (
    <View style={appStyles.mainContainer}>
      <FlatList
        data={products}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 20, marginHorizontal: 5}}
        renderItem={({item, index}) => (
          <ProductCell item={item} index={index} />
        )}
      />
    </View>
  );
};

export default ProductScreen;

const ProductCell = props => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        elevation: 15,
        marginTop: 10,
        borderRadius: 10,
      }}
      activeOpacity={1}
      onPress={() => {
        RootNavigation.navigate(AppScreens.DetailScreen, props?.item);
      }}>
      <Image
        source={{uri: props?.item?.image}}
        style={{
          height: 150,
          width: Dimensions.get('screen').width / 2 - 10,
          resizeMode: 'center',
          aspectRatio: 1,
          alignSelf: 'center',
          marginBottom: 20,
        }}
      />

      <Text style={styles.productTitle} numberOfLines={2}>
        {props?.item?.title}
      </Text>

      <Text style={styles.categoryTitle}>{props?.item?.category}</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text>best price </Text>
        <Text style={[styles.productTitle, {color: 'green'}]}>
          ₹{props?.item?.price}/-
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLOR_BLACK,
    paddingHorizontal: 10,
  },

  categoryTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLOR_GRAY,
    paddingHorizontal: 10,
    textTransform: 'capitalize',
  },
});
