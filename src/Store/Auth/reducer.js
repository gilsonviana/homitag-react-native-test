import * as types from './types'

const initialState = {
    token: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }
        default:
            return state
    }
}