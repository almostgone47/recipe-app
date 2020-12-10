import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetails = props => {
  const allMeals = useSelector(state => state.meals.meals);
  const id = props.navigation.getParam('id');
  const isFav = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === id)
  );

  const selectedMeal = allMeals.find(meal => meal.id === id);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(id));
  }, [dispatch, id]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isFav });
  }, [isFav]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.details}>
        <Text>{selectedMeal.duration} mins</Text>
        <Text>{selectedMeal.complexity}</Text>
        <Text>{selectedMeal.affordability}</Text>
      </View>
      <View style={styles.screen}>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient => {
          return (
            <Text style={styles.ingItems} key={ingredient}>
              {ingredient}
            </Text>
          );
        })}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map((step, i) => {
          return (
            <ListItem style={styles.listItem} key={step}>
              {i + 1}. {step}
            </ListItem>
          );
        })}
      </View>
    </ScrollView>
  );
};

MealDetails.navigationOptions = navigationData => {
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const isFav = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

export default MealDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  ingItems: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
});
