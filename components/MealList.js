import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import MealItem from '../components/MealItem';

const MealList = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  const renderMeal = itemData => {
    const isFav = favMeals.some(meal => meal.id === itemData.item.id);

    return (
      <MealItem
        item={itemData.item}
        onSelectMeal={() => {
          props.navigation.navigate('MealDetails', {
            id: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFav,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.displayedMeals}
        navigation={props.navigation}
        renderItem={renderMeal}
        style={{ width: '100%' }}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
