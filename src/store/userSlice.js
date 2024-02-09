import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  status: false,
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
            state.staus=true;
        },

        removeUser:(state)=>{
            state.user={};
            state.status=false
        }
    }
});

export default authSlice.reducers;
export const {setUser,removeUser}=authSlice.actions;
