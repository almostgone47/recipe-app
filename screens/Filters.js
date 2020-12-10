import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { setFilters } from '../store/actions/meals';
import Colors from '../constants/Colors';

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.title}>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primary }}
        thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
        value={props.value}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const Filters = props => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const filters = {
      isGlutenFree: isGlutenFree,
      isLactoseFree: isLactoseFree,
      isVegan: isVegan,
      isVegetarian: isVegetarian,
    };
    dispatch(setFilters(filters));
  }, [isVegan, isVegetarian, isLactoseFree, isGlutenFree]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [isVegan, isVegetarian, isLactoseFree, isGlutenFree]);

  return (
    <View style={styles.screen}>
      <Text>Filters</Text>
      <FilterSwitch
        value={isGlutenFree}
        onChange={newVal => setIsGlutenFree(newVal)}
        label="Gluten Free"
      />
      <FilterSwitch
        value={isLactoseFree}
        onChange={newVal => setIsLactoseFree(newVal)}
        label="Lactose Free"
      />
      <FilterSwitch
        value={isVegan}
        onChange={newVal => setIsVegan(newVal)}
        label="Vegan"
      />
      <FilterSwitch
        value={isVegetarian}
        onChange={newVal => setIsVegetarian(newVal)}
        label="Vegetarian"
      />
    </View>
  );
};

Filters.navigationOptions = {
  headerTitle: 'Filter Meals',
};

export default Filters;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});
