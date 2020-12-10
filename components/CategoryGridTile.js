import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CategoryGridTile = props => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: props.itemData.item.color },
        ]}
      >
        <Text style={styles.title}>{props.itemData.item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 80,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default CategoryGridTile;
