import * as React from 'react'
import { SafeAreaView, ScrollView, Image, Text, Animated, TouchableOpacity, StyleSheet, FlatList, View } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import playlistService from '../../Services/playlist'
import constants from '../../Constants'

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
    }, [href])

    if (!playlistState) {
        return <Text>Loading</Text>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{position: 'absolute', left: 0, top: 40}}>
                <HeaderBackButton onPress={() => navigation.goBack()} tintColor={constants.colorGray} />
            </View>
            <ScrollView style={styles.wrapper}>
                <Animated.View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMethod="resize" resizeMode="contain" source={{uri: playlistState.images[0].url}}/>
                </Animated.View>
                <Text style={styles.title}>{playlistState.name}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colorDark
    },
    imageContainer: {
        flex: 1,
        height: 250
    },
    image: {
        flex: 1,
        width: undefined
    },
    wrapper: {
        marginTop: 22,
        marginHorizontal: constants.margin
    },
    title: {
        marginTop: 22,
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