import * as React from 'react'
import { FlatList, Animated, StyleSheet, SafeAreaView, ActivityIndicator, View, Image, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Toast from 'react-native-tiny-toast'

import constants from '../../Constants'
import PlaylistItem from './PlaylistItem'
import { getToken } from '../../Store/Auth/actions'
import { getRecommendations } from '../../Store/Recommendations/actions'

const RecommendedScreen = ({
    getToken,
    getRecommendations,
    recommendations
}) => {
    const { useState, useEffect } = React

    const [isLoading, setIsLoading] = useState(true)
    const [scrollY] = useState(new Animated.Value(0))

    const HEADER_MAX_HEIGHT = 120;
    const HEADER_MIN_HEIGHT = 0;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    })

    const textOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0.25],
        extrapolate: 'clamp'
    })

    const tokenRequest = async () => {
        try {
            const token = await getToken()
            setIsLoading(false)
            if (token) {
                await getRecommendations(token)
            }
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

    useEffect(() => {
        tokenRequest()
    }, [])

    if (isLoading) {
        return (
            <LinearGradient style={styles.container} colors={[constants.colorPrimary, constants.colorDark, constants.colorDark]}>
                <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} color={constants.colorGray} size="large" />
            </LinearGradient>
        )
    }

    if (!recommendations.playlists) {
        return (
            <LinearGradient style={[styles.container, {justifyContent: 'center'}]} colors={[constants.colorPrimary, constants.colorDark, constants.colorDark]}>
                <View style={{height: 300, margin: 'auto'}}>
                    <Image blurRadius={.5} style={{flex: 1, width: undefined}} resizeMode="contain" resizeMethod="resize" source={require('../../Assets/images/void.png')} />
                </View>
                <Text style={{textAlign: 'center', color: constants.colorGray, marginTop: 50}}>No internet connection</Text>
                <TouchableOpacity onPress={tokenRequest} style={{width: 200, alignSelf: 'center', marginTop: 40}}>
                    <LinearGradient style={{borderRadius: 2, paddingVertical: 12}} colors={[constants.colorPrimary, constants.colorBlack]}>
                        <Text style={{color: constants.colorGray, textAlign: 'center'}}>Try again</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    return (
        <LinearGradient style={styles.container} colors={[constants.colorPrimary, constants.colorBlack, constants.colorBlack]}>
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View
                    style={{
                        height: headerHeight,
                    }}
                >
                    <Animated.Text style={[styles.title, { opacity: textOpacity }]}>{recommendations.message}</Animated.Text>
                </Animated.View>
                <FlatList
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: { contentOffset: { y: scrollY } }
                        }], {
                        useNativeDriver: false
                    }
                    )}
                    numColumns={2}
                    style={styles.list}
                    data={recommendations.playlists}
                    renderItem={({ item }) => <PlaylistItem href={item.href} numOfTracks={item.tracks.total} imageUri={item.images[0].url} />}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colorBlack,
    },
    title: {
        paddingTop: 50,
        color: constants.colorGray,
        fontSize: 18,
        textAlign: 'center'
    },
    list: {
        flex: 1,
        marginHorizontal: constants.margin
    }
})

const mapStateToProps = (state) => ({
    recommendations: state.recommendations
})

RecommendedScreen.propTypes = {
    getToken: PropTypes.func.isRequired,
    getRecommendations: PropTypes.func.isRequired,
    recommendations: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getRecommendations, getToken })(RecommendedScreen)