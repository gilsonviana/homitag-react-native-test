import * as React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import constants from '../../../Constants'

const PlaylistItem = ({
    href,
    imageUri,
    numOfTracks
}) => {
    const navigation = useNavigation()

    const handleOnPress = () => {
        navigation.navigate('Playlist', { href: href })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleOnPress}>
            <Image style={styles.image} resizeMethod="auto" resizeMode="contain" source={{uri: imageUri}} />
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

const mapStateToProps = (state) => ({
    token: state.auth.token
})

PlaylistItem.propTypes = {
    href: PropTypes.string.isRequired,
    imageUri: PropTypes.string.isRequired, 
    numOfTracks: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(PlaylistItem)