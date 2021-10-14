import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: {status:false,email:''},
}

export const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoggedInUser } = slice.actions

export default slice.reducer;