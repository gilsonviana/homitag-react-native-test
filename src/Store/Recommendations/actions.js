import * as types from './types'
import axios from 'axios'

export const getRecommendations = (token = '') => async dispatch => {
    try {
        const { data } = await axios({
            url: 'https://api.spotify.com/v1/browse/featured-playlists?country=BR',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        dispatch({
            type: types.SET_RECOMMENDATIONS,
            payload: {
                message: data.message,
                playlists: data.playlists.items
            }            
        })
    } catch (e) {
        throw new Error(e)
    }
}