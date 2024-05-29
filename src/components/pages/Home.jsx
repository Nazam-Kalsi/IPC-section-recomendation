import React from "react";
import { Button } from "../comp";
import { Link } from "react-router-dom";
function Home() {
  return (
    <section className="lg:flex lg:justify-around">
      <div className="sm:relative flex-grow min-h-96 sm:h-[calc(100vh-5rem)] bg-[url(/home.svg)]  bg-cover">
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
