import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (state.user == null) {
        state.user = action.payload;
      } else {
        const user = {...(action.payload),...(state.user)};
        state.user=user;
      }
      state.status = true;
    },

    removeUser: (state) => {
      state.user = null;
      state.status = false;
    },
  },
});

export default authSlice.reducer;
export const { setUser, removeUser } = authSlice.actions;
