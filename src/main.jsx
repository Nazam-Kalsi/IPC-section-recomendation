import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {Login, SignUp,Home, UserHome, GetComplaint, AddComplaint} from "./components/pages";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router=createBrowserRouter(
createRoutesFromElements(
<Route path="" element={<App />}>  
<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<SignUp/>}/>
<Route path="/userhome" element={<UserHome/>}/>
<Route path="/myComplaint" element={<GetComplaint/>}/>
<Route path="/complaint" element={<AddComplaint/>}/>
</Route>
)
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    
  </React.StrictMode>
);
