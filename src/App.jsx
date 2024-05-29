import "./App.css";
import auth from "./AppWrite/auth";
import { Outlet } from "react-router-dom";
import { Footer, Header, Container } from "./components/comp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import userData from "./AppWrite/userBucket";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.currentUser().then((user) => {
      dispatch(setUser(user));
      userData.getInfo(user.$id).then((res) => {
        dispatch(setUser(res));
      });
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
