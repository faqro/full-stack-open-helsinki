import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return null
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = (message, time) => {
    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time*1000)
    }
}

export default notificationSlice.reducer