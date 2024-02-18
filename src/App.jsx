import { Application } from "@splinetool/runtime";
import Spline from "@splinetool/react-spline";
import "./App.css";
import auth from "./AppWrite/auth";
import { Outlet } from "react-router-dom";
import { Footer, Header, Container } from "./components/comp";

// const urlParams = new URLSearchParams(window.location.search);
// const secret = urlParams.get("secret");
// const userId = urlParams.get("userId");
// auth.emailVerification(userId, secret);

function App() {
  return (
    <>
      <Header />
      {/* <Spline scene="https://prod.spline.design/sM1GVVO227D2jbh5/scene.splinecode" /> */}
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
