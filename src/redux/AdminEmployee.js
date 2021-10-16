import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allAdminEmployee: [],
}

export const slice = createSlice({
  name: 'adminEmployee',
  initialState,
  reducers: {
    setAllAdminEmployee: (state, action) => {
      state.allAdminEmployee = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllAdminEmployee } = slice.actions

export default slice.reducer;