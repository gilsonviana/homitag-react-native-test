import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import recommendations from './Recommendations/reducer'

const rootReducer = combineReducers({
    recommendations
})

export default function configureStore () {
    const middlewares = [thunk]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const store = createStore(rootReducer, compose(middlewareEnhancer))

    return store
}