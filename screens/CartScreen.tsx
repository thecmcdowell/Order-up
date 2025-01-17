// @TODO move the list item into a seperate container
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "../components/Themed";
import GrandTotalMath from "../helperFunctions/GrandTotal";
import CurrentTotal from "../components/CurrentTotal";
import {
  deleteItem,
  updateCart,
  setGrandTotal,
} from "../state/ducks/ordering/actions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state.cart);
  const grandTotal = useSelector((state) => state.grandTotal);
  const [updatedItem, setUpdatedItem] = useState({});
  const [currentSelection, setCurrentSelection] = useState({});
  const [editSelectionVisible, setEditSelectionVisible] = useState(false);
  console.log("current cart", currentCart);
  useEffect(() => {
    const total = GrandTotalMath(currentCart);
    dispatch(setGrandTotal(total));
  });

  const handleItemPress = (item) => {
    setCurrentSelection(item);
    setEditSelectionVisible(!editSelectionVisible);
  };

  const handleUpdatePress = () => {
    dispatch(updateCart(updatedItem));
    setEditSelectionVisible(false);
  };

  const dispatchDelete = () => {
    dispatch(deleteItem(currentSelection)), setEditSelectionVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Are You Sure?",
      "Are you sure you want to delete this order",
      [
        { text: "Delete", onPress: () => dispatchDelete() },
        { text: "cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleTextInput = (text: string) => {
    const { price } = currentSelection;
    const newTotal = text * price;
    const updated = {
      ...currentSelection,
      quantity: text,
      totalPrice: newTotal,
    };
    setCurrentSelection({ ...currentSelection, quantity: text });

    setUpdatedItem(updated);
  };

  const listItem = (foodItem) => {
    const { item } = foodItem;
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
          <Text>${item.totalPrice}</Text>
          <Text>qty: {item.quantity}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={currentCart}
        renderItem={listItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {grandTotal !== 0 && <CurrentTotal total={grandTotal} />}
      <Modal
        animationType="slide"
        visible={editSelectionVisible}
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text>Edit Qty of Your {currentSelection.title}</Text>
            <View style={{ padding: "5%" }}>
              <TextInput
                value={currentSelection.quantity}
                onChangeText={(text) => handleTextInput(text)}
                style={{
                  borderWidth: 1,
                  borderRadius: 0.25,
                  minWidth: "20%",
                  padding: 5,
                }}
              />
              <Button title="Update" onPress={() => handleUpdatePress()} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Cancel"
                onPress={() => setEditSelectionVisible(false)}
              />
              <Button
                color="#ff0000"
                title="Delete"
                onPress={() => handleDelete()}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default CartScreen;
