import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../comp";
import auth from "../../AppWrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import userData from "../../AppWrite/userBucket";
import { useNavigate } from "react-router-dom";
function Login() {
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
            dispatch(setUser(current));
            if (userinfo?.userType == "common") navigate("/userhome");
            else navigate("/adminhome");
          }
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
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
        <Button>Log in</Button>
      </form>
    </div>
  );
}

export default Login;
