import * as React from 'react'
import { View, FlatList, Text, Animated, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'

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

    const HEADER_MAX_HEIGHT = 150;
    const HEADER_MIN_HEIGHT = 0;

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
        <View style={styles.container}>
            <Animated.View>
                <LinearGradient colors={[constants.colorPrimary, constants.colorBlack]}>
                    <Text style={styles.title}>Recommendations</Text>
                    <Text style={styles.heading}>{recommendations.message}</Text>
                </LinearGradient>
            </Animated.View>
            <FlatList 
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {contentOffset: {y: scrollY}}
                    }], {
                        useNativeDriver: false
                    }
                )}
                numColumns={2}
                style={styles.list}
                data={recommendations.playlists}
                renderItem={({ item }) => <PlaylistItem numOfTracks={item.tracks.total} albumUri={item.images[0].url}/>}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colorBlack,
    },
    title: {
        paddingTop: 70,
        marginBottom: 12,
        color: constants.colorGray,
        fontSize: 18,
        textAlign: 'center'
    },
    list: {
        flex: 1,
        marginHorizontal: 6
    },
    heading: {
        textAlign: "center",
        marginBottom: 22,
        color: constants.colorGray,
    }
})

const mapStateToProps = (state) => ({
    recommendations: state.recommendations
})

export default connect(mapStateToProps, { getRecommendations, getToken })(RecommendedScreen)