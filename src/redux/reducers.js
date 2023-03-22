import {
  ADD_TO_CART,
  CART_TOTAL,
  RESET_CART,
  SET_CARTS,
  SET_CATEGORIES,
} from './actions';

const initialState = {
  categories: null,
  carts: [],
  cart_total: 0,
};

export const appReducers = (state = initialState, actions) => {
  switch (actions?.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: actions?.payload,
      };
      break;
    case SET_CARTS:
      return {
        ...state,
        carts: [],
      };
    case ADD_TO_CART:
      return {...state, carts: actions?.payload};
    case CART_TOTAL:
      return {
        ...state,
        cart_total: actions?.payload,
      };
    case RESET_CART:
      return {
        ...state,
        carts: [],
        cart_total: 0,
      };
    default:
      return state;
      break;
  }
};
