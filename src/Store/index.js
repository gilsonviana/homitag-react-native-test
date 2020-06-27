import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import recommendations from './Recommendations/reducer'
import auth from './Auth/reducer'

const rootReducer = combineReducers({
    auth,
    recommendations
})

export default function configureStore () {
    const middlewares = [thunk]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const store = createStore(rootReducer, compose(middlewareEnhancer))

    return store
}