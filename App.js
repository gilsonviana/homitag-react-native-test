/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RecommendedScreen from './src/Components/RecommendedScreen'

const Stack = createStackNavigator();

const App: () => React$Node = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Recommended" component={RecommendedScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});

export default App;
