import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Cell = ({ value }) => {
  return (
    <View
      style={[styles.cellStyle, styles[`cell${value > 256 ? 256 : value}`]]}
    >
      <Text
        style={[styles.textStyle, { color: value > 4 ? "#f8f5f0" : "#776e65" }]}
      >
        {value > 0 ? value : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cellStyle: {
    backgroundColor: "#d6cdc4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 5,
  },
  cell2: {
    backgroundColor: "#eee4da",
  },
  cell4: {
    backgroundColor: "#ece0c8",
  },
  cell8: {
    backgroundColor: "#f2b179",
  },
  cell16: {
    backgroundColor: "#f59563",
  },
  cell32: {
    backgroundColor: "#f57c5f",
  },
  cell64: {
    backgroundColor: "#f65d3b",
  },
  cell128: {
    backgroundColor: "#edce71",
  },
  cell256: {
    backgroundColor: "#edcc61",
  },
  textStyle: {
    fontSize: 30,
    color: "#776e65",
  },
});

export default Cell;