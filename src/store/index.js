import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers'
import { loadState , saveState } from './reducers/stateLoader'

const composeEnahncers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    loadState()
)

store.subscribe(() => {
    saveState(store.getState())
})