import { configureStore } from '@reduxjs/toolkit'
import { logger } from './features/middleware'
// import reducer
import dataReducer from './features/dataSlice'

export const store = configureStore({
    reducer: {
        data: dataReducer
    },
    middleware: [ logger ]
})