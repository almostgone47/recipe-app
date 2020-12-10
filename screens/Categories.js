import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';

const Categories = props => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        itemData={itemData}
        style={styles.tile}
        onSelect={() => {
          props.navigation.navigate('CategoryMeals', { id: itemData.item.id });
        }}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

export default Categories;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    flex: 1,
  },
});
