import { configureStore } from '@reduxjs/toolkit';
import authreducer from "./userSlice"
const store = configureStore({
    reducer:{
        authreducer
    }
});

export default store;