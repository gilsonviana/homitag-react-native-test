import * as types from './types'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_RECOMMENDATIONS:
            return [
                ...action.payload.recommendations
            ]
        default:
            return state
    }
}