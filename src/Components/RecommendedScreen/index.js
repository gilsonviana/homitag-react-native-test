import * as React from 'react'
import { View, FlatList, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import constants from '../../Constants'

import PlaylistItem from './PlaylistItem'

const { width } = Dimensions.get('window')


const RecommendedScreen = () => {
    const DATA = [{
        id: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXzkSaMzIqe1iHjeQn6Acdvv6yMN6vqWHuPw&usqp=CAU',
        numOfTracks: 12
    }, {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTw0GgzqopGoHKyTDnlZRr5Nuo21TSmWYzINg&usqp=CAU',
        numOfTracks: 22
    }, {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXzkSaMzIqe1iHjeQn6Acdvv6yMN6vqWHuPw&usqp=CAU',
        numOfTracks: 31
    }, {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTw0GgzqopGoHKyTDnlZRr5Nuo21TSmWYzINg&usqp=CAU',
        numOfTracks: 1
    }]
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={[constants.colorPrimary, constants.colorBlack]}>
                <Text style={styles.title}>Recommendations</Text>
                <Text style={styles.heading}>Let us handle the playlists for you</Text>
            </LinearGradient>
            <FlatList 
                numColumns={2}
                style={styles.list}
                data={DATA}
                renderItem={({ item }) => <PlaylistItem numOfTracks={item.numOfTracks} albumUri={item.image}/>}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colorBlack,
    },
    title: {
        paddingTop: 22,
        marginBottom: 12,
        color: constants.colorGray,
        fontSize: 18,
        textAlign: 'center'
    },
    list: {
        flex: 1,
        marginHorizontal: 6
    },
    heading: {
        textAlign: "center",
        marginBottom: 22,
        color: constants.colorGray,
    }
})

export default RecommendedScreen