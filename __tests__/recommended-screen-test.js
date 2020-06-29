import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import RecommendedScreen from 'Components/RecommendedScreen'

const mockStore = configureStore([])

jest.useFakeTimers();

describe('Recommended screen', () => {
    let store;
    let Component;

    beforeEach(() => {
        store = mockStore({
            recommendations: {
                message: '',
                playlists: []
            }
        })

        Component = renderer.create(
            <Provider store={store}>
                <RecommendedScreen />
            </Provider>
        )
    })

    it('should render with initial state', () => {
        expect(Component.toJSON()).toMatchSnapshot()
    })
})