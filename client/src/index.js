import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from "redux-logger"
import './index.css'
import reducers from './reducers/index'
import App from './App'

const store = createStore(reducers, compose(applyMiddleware(logger, thunk)))

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
