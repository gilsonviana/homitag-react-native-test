import * as React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'

import constants from '../../../Constants'

const PlaylistTrack = ({
    popularity,
    trackName,
    artistName,
    imageUrl
}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{uri: imageUrl}}/>
            <View style={{flex: 1}}>
                <Text style={styles.heading}>{trackName}</Text>
                <Text style={styles.subHeading}>{artistName}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text>{popularity}</Text>
                <Image style={styles.icon} source={require('../../../Assets/icons/heart.png')} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: constants.margin,
    },
    image: {
        width: 64,
        height: 64,
        marginRight: 12
    },
    heading: {
        color: constants.colorGray,
        fontWeight: 'bold'
    },
    subHeading: {
        color: constants.colorGray
    },
    icon: {
        // flex: 1,
        width: 18,
        height: 18
    },
    rightContainer: {
        marginLeft: 'auto',
        alignItems: 'center'
    }
})

PlaylistTrack.propTypes = {
    popularity: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
}

export default PlaylistTrack