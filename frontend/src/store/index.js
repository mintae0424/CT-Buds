import { createStore, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from './middleware/api'
import { rootReducer } from './reducers'
import { loadState , saveState } from './reducers/stateLoader'
import { composeWithDevTools } from 'redux-devtools-extension'


export const store = createStore(
    rootReducer,
    loadState(),
    composeWithDevTools(applyMiddleware(apiMiddleware))
)

store.subscribe(() => {
    saveState(store.getState())
})