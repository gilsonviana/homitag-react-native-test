import * as types from './types'
import axios from 'axios'
import { keys } from '../../Config/keys'
import publicIP from 'react-native-public-ip'

export const getRecommendations = (token = '') => async dispatch => {
    try {
        const ip = await publicIP()
        
        const res = await axios({
            url: `http://api.ipstack.com/${ip}?access_key=${keys.API_KEY}`,
            method: 'GET'
        }) 

        if (!res) {
            throw new Error("Connection error. Please, check your internet connection.")
        }

        const { data } = await axios({
            url: `https://api.spotify.com/v1/browse/featured-playlists?country=${res.data.country_code}`,
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