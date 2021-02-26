// @TODO this needs to have a modal instead of a locked view
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/ducks/ordering/actions";
import getFood from "../api/foodApi";
import { Text, View } from "../components/Themed";
interface foodItem {
  index: Number;
  item: foodItemDetail;
}

interface foodItemDetail {
  title: String;
  price: Number;
  description: String;
}

export default function Home() {
  const dispatch = useDispatch();
  const [foodItems, setFoodItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [addToCartCounterVisible, setAddToCartCounterVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const cartItems = useSelector((state) => state);
  useEffect(() => {
    let items = getFood();
    setFoodItems(items);
  }, []);

  const handleItemPress = (item: foodItemDetail) => {
    setAddToCartCounterVisible(!addToCartCounterVisible);
    setSelectedItem(item);
  };

  const handleAddToCart = () => {
    let cartItem = {
      title: selectedItem.title,
      description: selectedItem.description,
      price: selectedItem.price,
      quantity: quantity,
    };
    dispatch(addToCart(cartItem));
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
          <Text>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={foodItems} renderItem={listItem} />
      <View>
        {addToCartCounterVisible && (
          <View
            style={{
              justifyContent: "center",
              borderWidth: 0.5,
              borderColor: "blue",
            }}
          >
            <Text>Add To Cart</Text>
            <Text>quantity?</Text>
            <TextInput
              keyboardType="number-pad"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <Button title="Add to Cart" onPress={handleAddToCart} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  addToCartCard: {},
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
