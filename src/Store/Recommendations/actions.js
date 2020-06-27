import * as types from './types'
import axios from 'axios'

export const getRecommendations = (token = '') => async dispatch => {
    try {
        const { data } = await axios({
            url: 'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=US',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({
            type: types.SET_RECOMMENDATIONS,
            payload: {
                recommendations: data.tracks
            }
        })
    } catch (e) {
        throw new Error(e)
    }
}