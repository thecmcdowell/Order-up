import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CurrentTotal = (props) => {
  return (
    <View style={styles.totalPricePill}>
      <Text style={{ color: "#ffffff" }}>total is: ${props.total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  totalPricePill: {
    backgroundColor: "#ff0000",
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CurrentTotal;
