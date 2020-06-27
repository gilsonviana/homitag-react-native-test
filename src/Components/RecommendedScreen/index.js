import * as React from 'react'
import { View, FlatList, Text, Animated, Dimensions, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'

import constants from '../../Constants'

import PlaylistItem from './PlaylistItem'
import { getRecommendations } from '../../Store/Recommendations/actions'

const RecommendedScreen = ({
    getRecommendations,
    recommendations
}) => {
    const { useState, useEffect } = React
    
    const [scrollY] = useState(new Animated.Value(0))

    const HEADER_MAX_HEIGHT = 150;
    const HEADER_MIN_HEIGHT = 0;

    useEffect(() => {
        const recommendationsRequest = async () => {
            try {
                await getRecommendations()
            } catch (e) {

            }
        }
        recommendationsRequest()
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View>
                <LinearGradient colors={[constants.colorPrimary, constants.colorBlack]}>
                    <Text style={styles.title}>Recommendations</Text>
                    <Text style={styles.heading}>Let us handle the playlists for you</Text>
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
                data={recommendations}
                renderItem={({ item }) => <PlaylistItem numOfTracks={item.numOfTracks} albumUri={item.image}/>}
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

export default connect(mapStateToProps, { getRecommendations })(RecommendedScreen)