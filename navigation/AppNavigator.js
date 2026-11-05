import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';
import MoveDetailsScreen from '../screens/MoveDetailsScreen';

// 3 rotas do app, como no mapa de navegação
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PokemonList" component={PokemonListScreen} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
        <Stack.Screen name="MoveDetails" component={MoveDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}