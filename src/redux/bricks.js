import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allBricks: [],
}

export const slice = createSlice({
  name: 'bricks',
  initialState,
  reducers: {
    setAllBricks: (state, action) => {
      state.allBricks = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllBricks } = slice.actions

export default slice.reducer;