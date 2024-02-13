import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { persister, store } from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Router>
) 
