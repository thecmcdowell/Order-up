// @TODO move the list item into a seperate container
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "../components/Themed";
import { deleteItem } from "../state/ducks/ordering/actions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state);
  const [currentSelection, setCurrentSelection] = useState({});
  const [editSelectionVisible, setEditSelectionVisible] = useState(true);

  console.log("current", currentCart);

  const handleItemPress = (item) => {
    setCurrentSelection(item);
    setEditSelectionVisible(!editSelectionVisible);
  };

  const handleDelete = () => {
    console.log("foo");
    dispatch(deleteItem(currentSelection));
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
      {currentCart === [] ? (
        <Text>Add some stuff to your cart!</Text>
      ) : (
        <FlatList data={currentCart} renderItem={listItem} />
      )}
      {editSelectionVisible && (
        <View style={{ alignItems: "center" }}>
          <Text>Edit Selection</Text>
          <View style={{ flexDirection: "row" }}>
            {/* <TextInput value={currentSelection.quantity} onChangeText={text => }/> */}
            <Button title="Delete" onPress={handleDelete} />
            <Button title="Update" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    width: "90%",
    borderBottomWidth: 0.5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default CartScreen;
