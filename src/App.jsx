import { useState } from "react";
import "./App.css";
import { Application } from '@splinetool/runtime';
import auth from './AppWrite.auth';

import Spline from '@splinetool/react-spline';

const urlParams = new URLSearchParams(window.location.search);
const secret = urlParams.get('secret');
const userId = urlParams.get('userId');
auth.emailVerification(userId, secret);
  
  
  function App() {
    const [count, setCount] = useState(0);
    return (
      <>
      <div>
      </div>  


    </>
    
  );
}

export default App;
