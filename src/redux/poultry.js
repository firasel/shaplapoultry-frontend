import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allPoultry: [],
}

export const slice = createSlice({
  name: 'poultry',
  initialState,
  reducers: {
    setAllPoultry: (state, action) => {
      state.allPoultry = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllPoultry } = slice.actions

export default slice.reducer;