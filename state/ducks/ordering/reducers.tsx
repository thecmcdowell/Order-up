import * as types from "./types";

interface Action {
  type: string;
  payload: {
    title: string;
    price: number;
    description: string;
    quantity: number;
    totalPrice: number;
  };
}

const initState = {
  grandTotal: 0,
  cart: [],
};

const orderReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case types.SET_GRAND_TOTAL:
      return {
        ...state,
        grandTotal: action.payload,
      };
    case types.ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case types.REMOVE_FROM_CART:
      const updated = state.cart.filter(
        (item) => item.title !== action.payload.title
      );
      return {
        ...state,
        cart: updated,
      };
    case types.UPDATE_CART:
      const updatedCart = state.cart.map((item) =>
        item.title === action.payload.title ? action.payload : item
      );
      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return state;
  }
};

export default orderReducer;
