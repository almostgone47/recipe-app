import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';

const Favorites = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  if (!favMeals.length) {
    return (
      <View style={styles.screen}>
        <Text>No favorite meals found. Start adding some!!</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <MealList displayedMeals={favMeals} navigation={props.navigation} />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
