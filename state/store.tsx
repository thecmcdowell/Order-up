import { createStore } from "redux";
import orderReducer from "./ducks/ordering/reducers";

const store = createStore(orderReducer);

export default store;
