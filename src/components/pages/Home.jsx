import React from "react";
import { Button } from "../comp";
import { Link } from "react-router-dom";
import { Application } from "@splinetool/runtime";
import Spline from "@splinetool/react-spline";
function Home() {
  return (
    <section className="lg:flex lg:justify-around">
      <div className="flex-grow min-h-96 h-[calc(100vh-5rem)] bg-[url(home.svg)]  bg-cover">
        {/* <Spline scene="https://prod.spline.design/sM1GVVO227D2jbh5/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/p7xEEV-5elHa9EBb/scene.splinecode" /> */}

        
      </div>
      <div className="flex flex-col justify-center items-center gap-8  flex-grow-[0.5] bg-zz">
        <Link to="/login">
          <Button className="px-24 py-3 font-semibold">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="px-24 py-3 font-semibold">Signup</Button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
