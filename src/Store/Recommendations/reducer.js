import * as types from './types'

const initialState = {
    message: '',
    playlists: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_RECOMMENDATIONS:
            return {
                message: action.payload.message,
                playlists: [
                    ...action.payload.playlists
                ]
            }
        default:
            return state
    }
}