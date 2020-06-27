import * as types from './types'
import reducer from './reducer'

const initialState = {
    message: '',
    playlists: []
}

describe("Recommendations reducer", () => {
    it("should return initial state", () => {
        expect(reducer(initialState, {})).toEqual({
            ...initialState
        })
    })

    it("should set recommendations", () => {
        expect(reducer(initialState, {type: types.SET_RECOMMENDATIONS, payload: { 
            message: 'MESSAGE_HERE',
            playlists: ["TRACK", "TRACK"]
        }})).toEqual({
            ...initialState,
            message: 'MESSAGE_HERE',
            playlists: ["TRACK", "TRACK"]
        })
    })
})