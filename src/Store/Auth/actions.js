import * as types from './types'
import { Base64 } from 'js-base64'
import qs from 'qs'
import axios from 'axios'
import { CLIENT_ID, CLIENT_SECRET } from '../../Config/keys'

export const getToken = () => async dispatch => {
    try {
        const encoded = Base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`, true)
        const data = qs.stringify({
            grant_type: 'client_credentials'
        })

        const res = await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                Authorization: `Basic OWY4MWZlMmFmMmI3NDk0OGFkYzYyYjM0Y2RjYjcyZTE6MjU1N2MyZjkyOGMyNGNlOThkYmE3NzA3ZDExYWNmZGU`,
                // Authorization: `Basic ${encoded}`,
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