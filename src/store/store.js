import { configureStore } from '@reduxjs/toolkit';
import authreducer from "./userSlice"
export default store = configureStore({
    reducer:{
        authreducer
    }
});
