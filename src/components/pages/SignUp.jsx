import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../comp";
import auth from "../../AppWrite/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { Loading } from "../comp";

function SignUp() {
  const [loader,setLoader]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let DataHandler = async (data) => {
    setLoader(true);
    console.log(data);
    dispatch(setUser({...data,userType:'common'}));
    const newUser = await auth.signup(
      data.email,
      data.password,
      data.firstname
    );
    if (newUser) {
      navigate("/login");
    }
  };

  return (
    <>
          {loader && <Loading />}

    <div className=" flex justify-center bg-[url(/bg.svg)] bg-bottom bg-no-repeat bg-cover">
      <form
        className="border sm:m-6 sm:p-8 m-2 p-2 sm:w-2/5 rounded-2xl bg-blur  backdrop-blur bg-white/50"
        onSubmit={handleSubmit(DataHandler)}
      >
        <p className="text-center text-primary-300 font-bold text-2xl">
          SIGN-UP
        </p>
        <div className="flex justify-around gap-1">
          <div className="w-full">
            <Input
              label="First Name"
              placeholder="firstname"
              {...register("firstname", {
                required: {
                  value: true,
                  message: "This is required field",
                },
              })}
            />
            <p className="text-red-500">{errors.firstname?.message}</p>
          </div>
          <div className="w-full">
            <Input
              className="w-full"
              label="Last Name"
              placeholder="lastname"
              {...register("lastname", {
                required: {
                  value: true,
                  message: "This is required field",
                },
              })}
            />
            <p className="text-red-500">{errors.lastname?.message}</p>
          </div>
        </div>
        <Input
          label="Phone Number"
          type="number"
          placeholder="0000000000"
          {...register("phone", {
            required: {
              value: true,
              message: "This is required field",
            },
            validate: {
              digits: (value) =>
                /^[0-9]{10}$/.test(value) || "phone Number has 10 Digits",
            },
          })}
        />{" "}
        <p className="text-red-500">{errors.phone?.message}</p>
        <Input
          label="Addahar Number"
          type="number"
          placeholder="0000-0000-0000"
          {...register("addahar", {
            required: {
              value: true,
              message: "This is required field",
            },
            validate: {
              digits: (value) =>
                /^[0-9]{12}$/.test(value) || "Addahar Number has 12 Digits",
            },
          })}
        />{" "}
        <p className="text-red-500">{errors.addahar?.message}</p>
        <Input
          label="email"
          type="email"
          placeholder="abc@gmail.com"
          {...register("email", {
            required: {
              value: true,
              message: "This is required field",
            },
            // validate:{
            //   baddomain: (value) =>(
            //     /admin.com/.test(value)||'Domain invalid'
            //   )
            // }
          })}
        />
        <p className="text-red-500">{errors.email?.message}</p>
        <Input
          label="Password"
          placeholder="********"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "This is required field",
            },
            minLength:8,
            validate:{
              char:(value)=>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) ||
              "should Contain 8 letters including capital letter and numbers",
            }
          })}
        />
        <p className="text-red-500">{errors.password?.message}</p>
        <p className="flex my-5">
          <input type="checkbox" id="check" className="mr-2" required />
          <label htmlFor="check">I agree with the terms and conditions</label>
        </p>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white ">
          Sign in
        </Button>
      </form>
    </div>
    </>
  );
}

export default SignUp;
