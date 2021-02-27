import * as types from "./types";

interface Item {
  title: string;
  price: number;
  description: string;
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

export const setGrandTotal = (grandTotal: number) => ({
  type: types.SET_GRAND_TOTAL,
  payload: grandTotal,
});
