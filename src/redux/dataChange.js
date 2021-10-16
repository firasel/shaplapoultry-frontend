import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  anyDataChange: true,
}

export const slice = createSlice({
  name: 'anyDataChange',
  initialState,
  reducers: {
    setAnyDataChange: (state, action) => {
      state.anyDataChange = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAnyDataChange } = slice.actions

export default slice.reducer;