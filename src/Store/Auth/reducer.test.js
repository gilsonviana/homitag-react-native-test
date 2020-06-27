import * as types from './types'
import reducer from './reducer'

const initialState = {
    token: ''
}

describe("Auth reducer", () => {
    it("should return initial state", () => {
        expect(reducer(initialState, {})).toEqual({
            ...initialState
        })
    })

    it("should set token", () => {
        expect(reducer(initialState, {type: types.SET_TOKEN, payload: { token: "TOKEN_HERE" }})).toEqual({
            ...initialState,
            token: "TOKEN_HERE"
        })
    })
})