import * as types from "./types";

interface Item {
  title: String;
  price: Number;
  description: String;
  quantity: number;
}
export const addToCart = (item: Item) => ({
  type: types.ADD_TO_CART,
  payload: item,
});

export const deleteItem = (item: Item) => ({
  type: types.REMOVE_FROM_CART,
  payload: item,
});

export const updateCart = (item: Item) => ({
  type: types.UPDATE_CART,
  payload: item,
});

export const setGrandTotal = (grandTotal: Number) => ({
  type: types.SET_GRAND_TOTAL,
  payload: grandTotal,
});
