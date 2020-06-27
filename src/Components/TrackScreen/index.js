import * as React from 'react'
import { SafeAreaView, ScrollView, Text, Image, View, Animated, StyleSheet } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import playlistService from '../../Services/playlist'
import constants from '../../Constants'

const TrackScreen = ({
    route,
    token
}) => {
    const { useEffect, useState } = React
    const { href, playlistName } = route.params

    const [trackState, setTrackState] = useState(null)

    const msConvertToMinutes = (ms) => {
        var minutes = Math.floor(ms / 60000)
        var seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    useEffect(() => {
        const trackRequest = async () => {
            try {
                const res = await playlistService(token).getTrack(href)
                setTrackState({
                    ...res
                })
            } catch (e) {

            }
        }

        trackRequest()
    }, [token])

    if (!trackState) {
        return <Text>loading</Text>
    }

    return (
        <LinearGradient style={styles.container} colors={[constants.colorPrimary, constants.colorBlack]}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* <View style={{position: 'absolute', left: 0, top: 40}}>
                    <HeaderBackButton onPress={() => navigation.goBack()} tintColor={constants.colorGray} />
                </View> */}
                <Text style={styles.title}>{playlistName}</Text>
                <Animated.View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMethod="resize" resizeMode="contain" source={{ uri: trackState.album.images[0].url }} />
                </Animated.View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.trackTitle}>{trackState.name} - {trackState.artists[0].name}</Text>
                    <Text style={styles.albumTitle}>{trackState.album.name}</Text>
                    <Text style={styles.artistTitle}>{trackState.artists[0].name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.icon} source={require('../../Assets/icons/duration.png')} />
                        <Text style={styles.duration}>{msConvertToMinutes(trackState.duration_ms)}</Text>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        height: 250,
        marginHorizontal: constants.margin * 6,
    },
    image: {
        flex: 1,
        width: undefined
    },
    title: {
        marginBottom: 12,
        textAlign: 'center',
        fontSize: constants.title,
        color: constants.colorGray,
        fontWeight: 'bold'
    },
    bottomContainer: {
        flex: 1,
        marginHorizontal: constants.margin * 3
    },
    trackTitle: {
        fontWeight: 'bold',
        fontSize: constants.title * 1.3,
        color: constants.colorGray,
        marginBottom: 12
    },
    albumTitle: {
        color: constants.colorGray,
        marginBottom: 12
    },
    artistTitle: {
        color: constants.colorGray,
        marginBottom: 12
    },
    duration: {
        color: constants.colorGray
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    }
})

const mapStateToProps = (state) => ({
    token: state.auth.token
})

TrackScreen.propTypes = {
    token: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(TrackScreen)