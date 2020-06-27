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
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import configureStore from './src/Store'

import MainStack from './src/Components/MainStack'
import TrackScreen from './src/Components/TrackScreen'

const Stack = createStackNavigator()
const store = configureStore()

const App: () => React$Node = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator mode="modal" screenOptions={{headerShown: false}}>
					<Stack.Screen name="Main" component={MainStack}/>
					<Stack.Screen 
						name="Track"
						component={TrackScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

const styles = StyleSheet.create({});

export default App;
