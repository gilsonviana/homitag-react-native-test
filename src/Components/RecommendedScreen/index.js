import * as React from 'react'
import { View, FlatList, Text, Animated, StyleSheet, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

    useEffect(() => {
        const tokenRequest = async () => {
            try {
                const token = await getToken()

                if (token) {
                    await getRecommendations(token)
                }
            } catch (e) {
                console.log("useEffect", e.response);
            }
        }
        tokenRequest()
    }, [])

    return (
        <LinearGradient style={styles.container} colors={[constants.colorPrimary, constants.colorBlack, constants.colorBlack]}>
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View
                    style={{
                        height: headerHeight,
                    }}
                >
                    <Animated.Text style={[styles.title, {opacity: textOpacity}]}>{recommendations.message}</Animated.Text>
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