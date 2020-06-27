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

import RecommendedScreen from './src/Components/RecommendedScreen'
import PlaylistScreen from './src/Components/PlaylistScreen'
import constants from './src/Constants';

const Stack = createStackNavigator();
const store = configureStore()

const App: () => React$Node = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen 
						name="Recommended" 
						component={RecommendedScreen} 
						options={{headerShown: false}}/>
					<Stack.Screen 
						name="Playlist" 
						component={PlaylistScreen} 
						options={{
							headerShown: false,
							// headerTitle: '',
							// headerBackTitleVisible: false, 
							// headerTintColor: constants.colorGray,
							// headerStyle: {
							// 	backgroundColor: constants.colorDark,
							// },
							// cardStyle: {
							// 	backgroundColor: '#fff'
							// }
						}}/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

const styles = StyleSheet.create({});

export default App;
