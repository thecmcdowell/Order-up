import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from "react-native";
import GrandTotalMath from "../helperFunctions/GrandTotal";
import CurrentTotal from "../components/CurrentTotal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setGrandTotal } from "../state/ducks/ordering/actions";
import getFood from "../api/foodApi";
import { Text, View } from "../components/Themed";
interface foodItem {
  index: number;
  item: foodItemDetail;
}

interface foodItemDetail {
  title: string;
  price: number;
  description: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const [foodItems, setFoodItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addToCartCounterVisible, setAddToCartCounterVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [addToCartDisabled, setAddToCartDisabled] = useState(true);
  const state = useSelector((state) => state);
  useEffect(() => {
    const items = getFood();
    setFoodItems(items);
  }, []);

  useEffect(() => {
    const total = GrandTotalMath(state.cart);
    dispatch(setGrandTotal(total));
  }, [state.cart]);

  const handleItemPress = (item: foodItemDetail) => {
    setAddToCartCounterVisible(!addToCartCounterVisible);
    setSelectedItem(item);
  };

  const handleAddToCart = () => {
    const { title, description, price } = selectedItem;
    const totalPrice = quantity * price;
    const cartItem = {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      totalPrice: totalPrice,
    };
    dispatch(addToCart(cartItem));
    setAddToCartCounterVisible(false);
    setQuantity(1);
  };

  const listItem = (foodItem: foodItem) => {
    const { item } = foodItem;
    // don't render the errors!
    if (!item.title) return null;
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={styles.listItem}
      >
        <View style={{ width: "90%" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={{ alignContent: "flex-end" }}>
          <Text>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleTextInput = (text: string) => {
    setQuantity(text);
    if (!text || text === "0") {
      setAddToCartDisabled(true);
    } else {
      setAddToCartDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList data={foodItems} renderItem={listItem} />
      {state.cart.length !== 0 && <CurrentTotal total={state.grandTotal} />}
      <Modal
        animationType="slide"
        visible={addToCartCounterVisible}
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text>Add {selectedItem.title} To Cart</Text>
            <View style={{ flexDirection: "row", padding: 30 }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 0.25,
                  minWidth: "20%",
                  padding: 5,
                }}
                keyboardType="number-pad"
                value={quantity}
                onChangeText={(text) => handleTextInput(text)}
                placeholder="qty"
              />
            </View>
            <Button
              disabled={addToCartDisabled}
              title="Add to Cart"
              onPress={() => handleAddToCart()}
            />
            <Button
              title="Cancel"
              onPress={() => setAddToCartCounterVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },

  listItem: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    width: "90%",
    borderBottomWidth: 0.5,
  },
  title: {
    fontWeight: "bold",
  },
});
