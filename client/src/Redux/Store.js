import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './User/UserSlice.js'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'

const RootReducers = combineReducers({ user : userReducer})

const persistConfig = {
    key: 'root',
    storage,
    version : 1
}

const persistedReducer = persistReducer(persistConfig,RootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultmiddleware) => 
        getDefaultmiddleware({
            serializableCheck: false
        })
})

export const persister = persistStore(store)