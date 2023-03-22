import {Constance} from '../services/constants';
import {callApi, RequestMethod} from '../services/ServiceManager';
import {printLog, ToastMessage} from '../utilities/functions';

export const SET_CATEGORIES = 'set_categories';
export const SET_CARTS = 'set_carts';
export const ADD_TO_CART = 'add_to_cart';
export const CART_TOTAL = 'cart_total';
export const RESET_CART = 'cart_reset';

export const getMyCatgories = onLoad => dispatch => {
  callApi(
    Constance.GET_CATEGORIES,
    RequestMethod.get,
    NaN,
    onLoading => {
      onLoad(onLoading);
    },
    onSuccess => {
      dispatch({
        type: SET_CATEGORIES,
        payload: onSuccess,
      });
    },
    onFailure => {},
  );
};

export const addToCart = (cartItems, product) => dispatch => {
  var item = [...cartItems];
  printLog('addToCart', `` + cartItems?.length);
  if (cartItems?.length == 0) {
    item?.push({...product, item_count: 1});
    ToastMessage('Add to cart successfully...');
  } else {
    var isAdded = -1;
    item?.map((item, index) => {
      printLog('addToCart', `` + item?.id);
      if (item?.id == product?.id) {
        isAdded = index;
      }
    });
    printLog('addToCart isAdded', `` + isAdded);
    if (isAdded > -1) {
      item[isAdded] = {
        ...item[isAdded],
        item_count: item[isAdded].item_count + 1,
      };
      ToastMessage('Item updated successfully...');
    } else {
      item?.push({...product, item_count: 1});
      ToastMessage('Add to cart successfully...');
    }
  }

  printLog(JSON.stringify(item));
  var totalAmount = 0;
  item?.map((item, index) => {
    totalAmount = totalAmount + item?.price * item?.item_count;
  });
  printLog(`totalAmount `, ` ${totalAmount}`);
  dispatch({
    type: ADD_TO_CART,
    payload: item,
  });
  dispatch({
    type: CART_TOTAL,
    payload: totalAmount,
  });
};

export const clearAllData = () => dispatch => {
  dispatch({
    type: RESET_CART,
    payload: {},
  });
};
