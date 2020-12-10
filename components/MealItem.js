import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const MealItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelectMeal} style={styles.mealItem}>
      <View style={{ flex: 1 }}>
        <View style={[styles.mealRow, styles.mealHeader]}>
          <ImageBackground
            style={styles.bgImage}
            source={{ uri: props.item.imageUrl }}
          >
            <Text style={styles.title} numberOfLines={1}>
              {props.item.title}
            </Text>
          </ImageBackground>
        </View>
        <View style={[styles.mealRow, styles.mealDetails]}>
          <Text>{props.item.duration} mins</Text>
          <Text>{props.item.complexity}</Text>
          <Text>{props.item.affordability}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
    margin: 5,
    padding: 5,
    borderRadius: '5px',
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: '90%',
    width: '99%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  mealDetails: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'space-between ',
    color: '#555',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});
