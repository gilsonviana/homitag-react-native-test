import * as React from 'react'
import { SafeAreaView, ScrollView, Text, Image, View, Animated, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {  } from '@react-navigation/stack'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import playlistService from '../../Services/playlist'
import constants from '../../Constants'

const TrackScreen = ({
    navigation,
    route,
    token
}) => {
    const { useEffect, useState } = React
    const { href, playlistName } = route.params
    const { width } = Dimensions.get('screen')

    const [trackState, setTrackState] = useState(null)
    const [transitionX] = useState(new Animated.Value(0))

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

        const trackTitleAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(
                        transitionX,
                        {
                            toValue: width / 2,
                            duration: 9500,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(
                        transitionX,
                        {
                            toValue: - width / 2,
                            duration: 5500,
                            useNativeDriver: true
                        }
                    )
                ])
            ).start()
        }

        trackRequest()
        trackTitleAnimation()
    }, [token])

    if (!trackState) {
        return <Text>loading</Text>
    }

    return (
        <LinearGradient style={styles.container} colors={[constants.colorPrimary, constants.colorBlack, constants.colorBlack]}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top: 10, down: 10, left: 10, right: 10}}>
                        <Image resizeMethod="resize" resizeMode="contain" style={styles.headerImage} source={require('../../Assets/icons/chevron-down.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{playlistName}</Text>
                </View>
                <ScrollView alwaysBounceVertical={false}>
                    {/* <View style={{position: 'absolute', left: 0, top: 40}}>
                        <HeaderBackButton onPress={() => navigation.goBack()} tintColor={constants.colorGray} />
                    </View> */}
                    <Animated.View style={styles.imageContainer}>
                        <Image style={styles.image} resizeMethod="resize" resizeMode="contain" source={{ uri: trackState.album.images[0].url }} />
                    </Animated.View>
                    <View style={styles.bottomContainer}>
                        <Animated.ScrollView horizontal style={{transform: [{translateX: transitionX}]}}>
                            <Text style={styles.trackTitle}>{trackState.name} - {trackState.artists[0].name}</Text>
                        </Animated.ScrollView>
                        <Text style={styles.albumTitle}>{trackState.album.name}</Text>
                        <Text style={styles.artistTitle}>{trackState.artists[0].name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={styles.icon} source={require('../../Assets/icons/duration.png')} />
                            <Text style={styles.duration}>{msConvertToMinutes(trackState.duration_ms)}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginHorizontal: constants.margin,
        marginBottom: 12,
    },
    headerImage: {
        width: 20, 
        height: 20
    },
    imageContainer: {
        flex: 1,
        height: 250,
        marginHorizontal: constants.margin * 6,
        marginBottom: 70
    },
    image: {
        flex: 1,
        width: undefined
    },
    title: {
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
        flex: 1,
        fontWeight: 'bold',
        fontSize: constants.title * 1.3,
        color: constants.colorGray,
        marginBottom: 22
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