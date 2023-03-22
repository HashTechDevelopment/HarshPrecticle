import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMyCatgories} from '../redux/actions';
import {Constance} from '../services/constants';
import {callApi} from '../services/ServiceManager';
import {AppScreens} from '../utilities/AppScreens';
import {ToastMessage} from '../utilities/functions';
import {Images} from '../utilities/Images';
import * as RootNavigation from '../utilities/RootNavigation';
import {appStyles, COLOR_BLACK, COLOR_WHITE} from '../utilities/styles';

const HomeScreen = props => {
  const {carts} = useSelector(state => state.appReducers);
  const {categories} = useSelector(state => state.appReducers);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // fetch category from server and send to store
  useEffect(() => {
    dispatch(
      getMyCatgories(onLoading => {
        setLoading;
      }),
    );
  }, []);

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
          <Text style={appStyles.actionbarTitle}>{`Categories`}</Text>
        ),

        headerLeft: () => <></>,

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

      [props.navigation],
    );
  });

  // Main UI
  return (
    <View style={appStyles.mainContainer}>
      {categories == null ? (
        <View></View>
      ) : categories?.length == 0 ? (
        <View>{/* category is not available */}</View>
      ) : (
        <FlatList
          data={categories}
          contentContainerStyle={{padding: 10}}
          ItemSeparatorComponent={<View style={{height: 10}} />}
          renderItem={({item, index}) => <CategoryCell item={item} />}
        />
      )}
    </View>
  );
};
export default HomeScreen;

// Component for Caregory
const CategoryCell = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        RootNavigation.navigate(AppScreens.ProductScreen, props?.item)
      }
      style={{
        backgroundColor: '#bdbdbd',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        elevation: 10,
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 20,
      }}>
      <Image source={Images.category} style={styles.categoryIcon} />
      <Text style={styles.categoryTitle}>{props?.item}</Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: COLOR_BLACK,
    marginTop: 20,
  },
  categoryIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginEnd: 10,
  },
});
