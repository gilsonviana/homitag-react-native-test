import * as React from 'react'
import { Image, Text, Animated, StyleSheet, FlatList, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Toast from 'react-native-tiny-toast'

import playlistService from '../../Services/playlist'
import constants from '../../Constants'

import Track from './PlaylistTrack'

const PlaylistScreen = ({
    navigation,
    route,
    token
}) => {
    const { useEffect, useState } = React
    const { href } = route.params

    const [isLoading, setIsLoading] = useState(true)
    const [playlistState, setPlaylistState] = useState(null)
    const [scrollY] = useState(new Animated.Value(0))

    const HEADER_MAX_HEIGHT = 350;
    const HEADER_MIN_HEIGHT = 75;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    })

    const headerBackground = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT],
        outputRange: ['transparent', constants.colorDark],
        extrapolate: 'clamp'
    })

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp'
    })

    useEffect(() => {
        const playlistRequest = async () => {
            try {
                const res = await playlistService(token).getPlaylist(href)
                setIsLoading(false)
                setPlaylistState({
                    ...res
                })
            } catch (e) {
                setIsLoading(false)
                Toast.show(
                    'Please, check your internet connection.',
                    {
                        position: 70,
                        duration: 3500,
                        containerStyle: {
                            backgroundColor: constants.colorDanger
                        }
                    }
                )
            }
        }

        playlistRequest()
    }, [href, token])

    if (isLoading) {
        return (
            <LinearGradient style={styles.container} colors={[constants.colorPrimary, constants.colorDark, constants.colorDark]}>
                <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} color={constants.colorGray} size="large" />
            </LinearGradient>
        )
    }

    if (!playlistState) {
        return (
            <LinearGradient style={[styles.container, {justifyContent: 'center'}]} colors={[constants.colorPrimary, constants.colorDark, constants.colorDark]}>
                <View style={{height: 300, margin: 'auto'}}>
                    <Image blurRadius={.5} style={{flex: 1, width: undefined}} resizeMode="contain" resizeMethod="resize" source={require('../../Assets/images/void.png')} />
                </View>
                <Text style={{textAlign: 'center', color: constants.colorGray, marginTop: 50}}>No internet connection</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 200, alignSelf: 'center', marginTop: 40}}>
                    <LinearGradient style={{borderRadius: 2, paddingVertical: 12}} colors={[constants.colorPrimary, constants.colorBlack]}>
                        <Text style={{color: constants.colorGray, textAlign: 'center'}}>Go Back</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    return (
        <LinearGradient style={styles.container} colors={[constants.colorPrimary, constants.colorDark, constants.colorDark]}>
            <Animated.View
                style={{
                    backgroundColor: headerBackground,
                    height: headerHeight
                }}
            >
                <Animated.View style={{ position: 'absolute', left: 0, top: 40 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, down: 10, left: 10, right: 10 }}>
                        <Image resizeMethod="resize" resizeMode="contain" style={styles.headerBackButton} source={require('../../Assets/icons/chevron-left.png')} />
                    </TouchableOpacity>
                </Animated.View>
                <View style={[styles.imageContainer]}>
                    <Animated.Image style={[styles.image, { opacity: imageOpacity }]} resizeMethod="resize" resizeMode="contain" source={{ uri: playlistState.images[0].url }} />
                    <Text style={styles.title}>{playlistState.name}</Text>
                </View>
            </Animated.View>
            <View style={styles.wrapper}>
                <FlatList
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: { contentOffset: { y: scrollY } }
                        }], {
                        useNativeDriver: false
                    }
                    )}
                    showsVerticalScrollIndicator={false}
                    data={playlistState.tracks.items}
                    renderItem={({ item }) => <Track playlistName={playlistState.name} href={item.track.href} trackName={item.track.name} imageUrl={item.track.album.images[0].url} artistName={item.track.artists[0].name} popularity={item.track.popularity} />}
                    keyExtractor={(item) => item.track.id}
                />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colorDark
    },
    headerBackButton: {
        width: 20,
        height: 20,
        marginLeft: constants.margin,
    },
    imageContainer: {
        flex: 1,
        height: 250,
        marginTop: 40,
        marginHorizontal: constants.margin * 6,
    },
    image: {
        flex: 1,
        width: undefined
    },
    wrapper: {
        flex: 1,
        marginTop: 40,
        marginHorizontal: constants.margin
    },
    title: {
        marginBottom: 12,
        textAlign: 'center',
        fontSize: constants.title,
        color: constants.colorGray,
        fontWeight: 'bold'
    }
})

const mapStateToProps = (state) => ({
    token: state.auth.token
})

PlaylistScreen.propTypes = {
    token: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(PlaylistScreen)