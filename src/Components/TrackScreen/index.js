import * as React from 'react'
import { SafeAreaView, ScrollView, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import playlistService from '../../Services/playlist'
import constants from '../../Constants'

const TrackScreen = ({
    route,
    token
}) => {
    const { useEffect, useState } = React
    const { href } = route.params

    const [trackState, setTrackState] = useState(null)

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
        <SafeAreaView style={styles.container}>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = (state) => ({
    token: state.auth.token
})

TrackScreen.propTypes = {
    token: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(TrackScreen)