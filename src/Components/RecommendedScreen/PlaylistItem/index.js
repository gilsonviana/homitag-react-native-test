import * as React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'

import constants from '../../../Constants'

const PlaylistItem = ({
    albumUri,
    numOfTracks
}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} resizeMethod="auto" resizeMode="contain" source={{uri: albumUri}} />
            <Text style={styles.track}>{numOfTracks} {numOfTracks > 1 ? 'Tracks' : 'Track'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 212
    },
    image: {
        flex: 1,
        width: undefined,
    },
    track: {
        marginVertical: 6,
        color: constants.colorGray,
        textAlign: 'center'
    }
})

export default PlaylistItem