import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.payload
      );
      if (existingIndex >= 0) {
        const updatedMeals = [...state.favoriteMeals];
        updatedMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedMeals,
        };
      } else {
        const meal = state.meals.find(meal => meal.id === action.payload);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }

    case SET_FILTERS:
      const appliedFilters = action.payload;

      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.isLactoseFree && meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.isVegan && meal.isVegan) {
          return false;
        }
        if (appliedFilters.isVegetarian && meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredMeals: filteredMeals,
      };

    default:
      return state;
  }
};

export default mealsReducer;
