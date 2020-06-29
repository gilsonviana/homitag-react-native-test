import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import MockedNavigator from '../src/Helper/mock-navigator'
import {cleanup, render} from 'react-native-testing-library';

import TrackScreen from 'Components/TrackScreen'

const mockStore = configureStore([])

jest.useFakeTimers();

describe('Track screen', () => {
    let store;
    let Component;
    
    afterEach(cleanup)
    beforeEach(() => {
        store = mockStore({
            auth: {
                token: ''
            },
            recommendations: {
                message: '',
                playlists: []
            }
        })

        Component = render(
            <Provider store={store}>
                <MockedNavigator component={TrackScreen} />
            </Provider>
        )
    })

    it('should render with initial state', () => {
        expect(Component.toJSON()).toMatchSnapshot()
    })
})