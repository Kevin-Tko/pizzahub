import { createSlice } from '@reduxjs/toolkit';

//This is the initial state
const initialState = {
    firstName: '',
    lastName: '',
};

const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateFirstName(state, action) {
            state.firstName = action.payload;
        },
        updateLastName(state, action) {
            state.lastName = action.payload;
        },
    },
});

//Exporting action by desructuring the userSlice
export const { updateFirstName, updateLastName } = userSlicer.actions;

export default userSlicer.reducer;
