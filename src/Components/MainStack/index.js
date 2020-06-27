import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import RecommendedScreen from '../RecommendedScreen'
import PlaylistScreen from '../PlaylistScreen'

const Stack = createStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName="Recommended" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Recommended"
                component={RecommendedScreen} />
            <Stack.Screen
                name="Playlist"
                component={PlaylistScreen} />
        </Stack.Navigator>
    )
}

export default MainStack