import { createSlice } from '@reduxjs/toolkit';
import { getUserRooms } from '../tableDB';



export const counterSlice = createSlice({
  name: 'rooms',
  initialState: { value: [] },
  reducers: {
    getRooms: (state, actions) => {
      console.log(actions);
      // getUserRooms(actions).then((rooms) => {
      //   state.value = rooms;
      // });
    },
  },
})

export const { getRooms } = counterSlice.actions;
export default counterSlice.reducer;