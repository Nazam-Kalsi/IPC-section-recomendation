import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
export function Header() {
  const user = useSelector((state) => state.authreducer.user);
  // console.log(user);
  const navigation = useNavigate();
  const data = [
    {
      name: "Home",
      link: "/home",
      activation: user?.$id ? true : false,
    },
    {
      name: "About",
      link: "/about",
      activation: user?.$id ? true : false,
    },
    {
      name: "login",
      link: "/login",
      activation: user?.$id ? false : true,
    },
    {
      name: "SignUp",
      link: "/signup",
      activation: user?.$id ? false : true,
    },
  ];
  return (
    <>
      <header className=" backdrop-blur bg-white/50 py-2">
        <nav className="flex justify-between mx-20 ">
          <p>
            <Link to="/">Logo</Link>
          </p>
          <ul className="flex">
            {data.map((item) => {
              return item.activation ? (
                <li key={item.name}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-500" : "text-black"
                      } py-2 px-4 border`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null;
            })}
          </ul>
          <p>{user?.name}</p>
        </nav>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <>
      <div>Footer</div>
    </>
  );
}
