import * as types from "./types";

interface Action {
  type: String;
  payload: {
    title: String;
    price: Number;
    description: String;
    quantity: number;
  };
}

const initState = [];

const orderReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, action.payload];
    case types.REMOVE_FROM_CART:
      console.log("actions", action.payload.title);
      let updated = state.filter((item) => {
        item.title != action.payload.title;
      });
      return state;
    case types.UPDATE_CART:
      return state;
    default:
      return state;
  }
};

export default orderReducer;
