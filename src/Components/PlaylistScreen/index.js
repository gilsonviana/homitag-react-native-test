import * as React from 'react'
import { SafeAreaView, ScrollView, Image, Text, Animated, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

const PlaylistScreen = ({
    name,
    albumUri,
    artistName,
    popularity
}) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Animated.View>
                    <Image source={{uri: albumUri}}/>
                </Animated.View>
                <Text>{name}</Text>
                <Text>{artistName}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlaylistScreen