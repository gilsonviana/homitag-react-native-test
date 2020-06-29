import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { StackRouter } from '@react-navigation/native'

import PlaylistScreen from 'Components/PlaylistScreen'

const mockStore = configureStore([])

jest.useFakeTimers();

describe('Playlist screen', () => {
    let store;
    let Component;
    let props;

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

        props = {
            route: {
                params: {
                    href: ''
                }
            }
        }

        Component = renderer.create(
            <Provider store={store}>
                <PlaylistScreen {...props} />
            </Provider>
        )
    })

    it('should render with initial state', () => {
        expect(Component.toJSON()).toMatchSnapshot()
    })
})