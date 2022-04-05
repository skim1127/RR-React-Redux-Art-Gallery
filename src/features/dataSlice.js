// file objective: Store API Data from https://collectionapi.metmuseum.org/public/collection/v1/objects/

import { createSlice } from "@reduxjs/toolkit"

// set initial state
const initialState = {
    objectId: 777,
    apiData: {}
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // Setting API Data to State
        setData: (state, action) => {
            return { ...state, apiData: action.payload }
        },
        // Re-setting state back to initial values
        clearData: () => {
            return initialState
        },
        // Entering a custom ID
        inputId: (state, action) => { 
            return { ...state, objectId: action.payload }
        },
        // Incrementing the ID by one
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1}
        },
        // Decrementing the ID by one
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1}
        }
    }
})

// export actions
export const { setData, clearData, inputId, incrementId, decrementId } = dataSlice.actions

// Fetch API Date
export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        let state = getState()
        const reponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const resData = await reponse.json()
        dispatch(setData(resData))
    }
    return dataThunk
}

export default dataSlice.reducer