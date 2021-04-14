import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware  from 'redux-thunk';
import { logger } from 'redux-logger';
import stocksReducer from './stocks/stocksReducer'

const rootReducer = combineReducers({
  stocks: stocksReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
)

export default store