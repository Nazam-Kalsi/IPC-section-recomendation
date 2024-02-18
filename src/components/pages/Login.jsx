import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../comp";
import auth from "../../AppWrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import userData from "../../AppWrite/userBucket";
import { useNavigate } from "react-router-dom";
import { Loading } from "../comp";

function Login() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // Redux State
  const dispatch = useDispatch();
  const storedata = useSelector((state) => state.authreducer.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let login = async (data) => {
    setLoader(true)
    let user = await auth.login(data);
    if (user) {
      let current = await auth.currentUser();
      if (current) {
        // dispatch(setUser(current));

        if (storedata)
          await userData.storeData({ ...storedata, userid: current.$id });
        else {
          const userinfo = await userData.getInfo(current.$id);
          if (userinfo) {
            dispatch(setUser(userinfo));
            dispatch(setUser({ ...current, phone: userinfo.phone }));
            if (userinfo?.userType == "common") navigate("/userhome");
            else navigate("/adminhome");
            console.log(userinfo);
          }
        }
      }
    }
  };

  return (
    <>
      {loader && <Loading />}
      <div className=" flex justify-center items-center h-[calc(100vh-5rem)] bg-[url(bg.svg)] bg-bottom bg-no-repeat bg-cover">
        <form
          onSubmit={handleSubmit(login)}
          className="border m-6 p-8 w-2/5 rounded-2xl bg-blur  backdrop-blur bg-white/50"
        >
          <p className="text-center text-primary-300 font-bold text-2xl">
            LOGIN
          </p>
          <Input
            label="email"
            type="email"
            placeholder="abc@gmail.com"
            {...register("email", {
              required: {
                value: true,
                message: "it is a required field",
              },
            })}
          />
          <p className="text-red-500">{errors.email?.message}</p>
          <Input
            label="Password"
            type="password"
            placeholder="********"
            {...register("password", {
              required: {
                value: true,
                message: "it is a required field",
              },
              minLength: {
                value: 8,
                message: "must be 8 characters",
              },
            })}
          />
          <p className="text-red-500">{errors.password?.message}</p>

          <Button className="w-full  mt-5">Log in</Button>
        </form>
      </div>
    </>
  );
}

export default Login;
