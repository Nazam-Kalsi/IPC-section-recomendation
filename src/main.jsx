import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {Login, SignUp,Home,MyInfo, UserHome, GetComplaint, AddComplaint,AdminHome,Complaints, IPCprovider, ViewComplaints} from "./components/pages";
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
<Route path="/adminhome" element={<AdminHome/>}/>
<Route path="/complaints" element={<Complaints/>}/>
<Route path='/complaints/:id' element={<IPCprovider/>}/>
<Route path='/allComplaints' element={<ViewComplaints/>}/>
<Route path='/myinfo' element={<MyInfo/>}/>
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
