import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Categories from '../screens/Categories';
import Filters from '../screens/Filters';
import CategoryMeals from '../screens/CategoryMeals';
import MealDetails from '../screens/MealDetails';
import Favorites from '../screens/Favorites';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const MealsNav = createStackNavigator({
  Categories: {
    screen: Categories,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
    navigationOptions: navData => {
      return {
        headerTitle: 'Meal Categories',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName="ios-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
        headerStyle: {
          backgroundColor: 'white',
          color: Colors.primary,
        },
      };
    },
  },
  CategoryMeals: CategoryMeals,
  MealDetails: MealDetails,
});

const FavNavigator = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
      navigationOptions: navData => {
        return {
          headerTitle: 'Favorites',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerStyle: {
            backgroundColor: 'white',
            color: Colors.primary,
          },
        };
      },
    },
    MealDetails: MealDetails,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNav,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.accent,
    },
  }
);

const FiltersNav = createStackNavigator({
  Filters: {
    screen: Filters,
    navigationOptions: navData => {
      return {
        headerTitle: 'Filters',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName="ios-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName="ios-save"
              onPress={navData.navigation.getParam('save')}
            />
          </HeaderButtons>
        ),
        headerStyle: {
          backgroundColor: 'white',
          color: Colors.primary,
        },
      };
    },
  },
});

const MainNav = createDrawerNavigator({
  Home: TabNavigator,
  Filters: FiltersNav,
});

export default createAppContainer(MainNav);
