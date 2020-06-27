import * as React from 'react'
import { SafeAreaView, ScrollView, Image, Text, Animated, TouchableOpacity, StyleSheet, FlatList, View } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

    const [playlistState, setPlaylistState] = useState(null)

    useEffect(() => {
        const playlistRequest = async () => {
            try {
                const res = await playlistService(token).getPlaylist(href)
                setPlaylistState({
                    ...res
                })
            } catch (e) {

            }
        }

        playlistRequest()
    }, [href, token])

    if (!playlistState) {
        return <Text>Loading</Text>
    }

    return (
        <View style={styles.container}>
            <LinearGradient style={{flex: 1}} colors={[constants.colorPrimary, constants.colorDark]}>
                <View style={{position: 'absolute', left: 0, top: 40}}>
                    <HeaderBackButton onPress={() => navigation.goBack()} tintColor={constants.colorGray} />
                </View>
                <Animated.View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMethod="resize" resizeMode="contain" source={{uri: playlistState.images[0].url}}/>
                </Animated.View>
            </LinearGradient>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{playlistState.name}</Text>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={playlistState.tracks.items}
                    renderItem={({ item }) => <Track playlistName={playlistState.name} href={item.track.href} trackName={item.track.name} imageUrl={item.track.album.images[0].url} artistName={item.track.artists[0].name} popularity={item.track.popularity} />}
                    keyExtractor={(item) => item.track.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colorDark
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