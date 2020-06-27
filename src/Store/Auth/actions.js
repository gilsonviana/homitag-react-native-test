import * as types from './types'
import qs from 'qs'
import axios from 'axios'

export const getToken = () => async dispatch => {
    try {
        const data = qs.stringify({
            grant_type: 'client_credentials'
        })

        const res = await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                Authorization: `Basic OWY4MWZlMmFmMmI3NDk0OGFkYzYyYjM0Y2RjYjcyZTE6MjU1N2MyZjkyOGMyNGNlOThkYmE3NzA3ZDExYWNmZGU`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        })
        
        dispatch({
            type: types.SET_TOKEN,
            payload: {
                token: res.data.access_token
            }
        })

        return res.data.access_token
    } catch (e) {
        throw new Error(e)
    }
}