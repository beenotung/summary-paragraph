import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import {
  CallHistoryMethodAction,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { logger } from 'redux-logger'
import summary, { SummaryAction } from './summary'

export const history = createBrowserHistory()

const reducer = combineReducers({
  router: connectRouter(history),
  summary,
})

export type RootState = ReturnType<typeof reducer>

export type RootAction = SummaryAction | CallHistoryMethodAction

export type RootDispatch = ThunkDispatch<RootState, null, RootAction>

const enhancer = applyMiddleware(thunk, logger, routerMiddleware(history))

export let store = createStore(reducer, enhancer)

export default store
