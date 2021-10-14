import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allCustomer: [],
}

export const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setAllCustomer: (state, action) => {
      state.allCustomer = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllCustomer } = slice.actions

export default slice.reducer;