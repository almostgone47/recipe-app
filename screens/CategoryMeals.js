import React from 'react';
import { Button, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';

import { useSelector } from 'react-redux';

const CategoryMeal = props => {
  const id = props.navigation.getParam('id');

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryId.indexOf(id) >= 0
  );

  if (!displayedMeals.length) {
    return (
      <View style={styles.screen}>
        <Text>No meals found. Try changing the filters you have set.</Text>>
      </View>
    );
  }

  return (
    <>
      <MealList displayedMeals={displayedMeals} navigation={props.navigation} />
      <Button
        title="Go Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </>
  );
};

CategoryMeal.navigationOptions = navigationData => {
  const id = navigationData.navigation.getParam('id');
  const selectedCategory = CATEGORIES.find(cat => cat.id === id);

  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMeal;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
